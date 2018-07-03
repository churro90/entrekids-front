import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute} from '@angular/router';
import { ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
isUserLoggedIn: boolean;
modalReference: NgbModalRef;
modalReference2: NgbModalRef;
closeResult: String;

usuario:any;
//REGISTRO

nombre: String;
apellido: String;
username: String;
contrasena: String;
contrasena2: String;
codigo_promo: String;
showing: boolean;

//LOGIN

usernamelogin: String;
contrasenalogin: String;
recuerdame = false;
auth: any;
//MODALS

@ViewChild('content') content: any;
@ViewChild('login') login: any;

  constructor(private router: Router,
              private modalService: NgbModal,
              private validateService: ValidateService, 
              private flashMessage: FlashMessagesService,
              private authService: AuthService ,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef       
             ) { 
           
              
               
                this.authService.popup.subscribe((val) => {
                  if(val === 'open') {
                    this.modalReference = this.modalService.open(this.content);
                  }
                });  
                this.authService.popupLogin.subscribe((val) => {
                  if(val === 'open'){
                    this.modalReference2 = this.modalService.open(this.login);
                  }
                });
             }

  ngOnInit() {
   this.showing = false;
   this.route.queryParams.forEach(params => {
     if(params){
      this.codigo_promo = params['codigo_promocional'];
     } else {
       return;
     }   
    if(this.codigo_promo != "" && this.codigo_promo != null){
      this.modalReference = this.modalService.open(this.content);
    }
   }); 
   if(this.authService.loggedIn()){
    this.authService.obtenerPerfil().subscribe(data => {
      this.usuario = data.usuario;      
     });
   }
   
  }
  ngOnDestroy(){
   
  }

  ngAfterViewInit(){ 
 
  }
 
  open(content){ 
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  }); 
   }
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  abrir(login){ 
    this.modalReference2 = this.modalService.open(login);
    this.modalReference2.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  }); 
   } 
  onRegisterSubmit(){
    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      contrasena: this.contrasena,
      contrasena2: this.contrasena2,
      codigo_promo: this.codigo_promo
      
    }
    //Campos requeridos
    if(!this.validateService.validateRegister(usuario) && this.showing == false){
      this.showing = true;
      this.flashMessage.show('Porfavor rellena todos los campos', {cssClass: 'alerta-registro', timeout: 3000});   
      setTimeout(()=> {
        this.showing = false;
      }, 3000);   
      return false;
    } 
    //Validar Email
    if(!this.validateService.validateUsuario(usuario.username) && this.showing == false){
      this.showing = true;
      this.flashMessage.show('Porfavor usa un email valido', {cssClass: 'alerta-registro', timeout: 3000});
      setTimeout(()=> {
        this.showing = false;
      }, 3000);  
      return false;
    } 
  /*   if(!this.validateService.validateCodigo(usuario.codigo_promo)){
      this.showing = true;
      this.flashMessage.show('Codigo promocional no válido', {cssClass: 'alerta-registro', timeout: 3000});
      setTimeout(()=> {
        this.showing = false;
      }, 3000);  
      return false;
    } */

    if(!this.validateService.validatePassword(usuario) && this.showing == false){
      this.showing = true;
      this.flashMessage.show('Contraseñas no son iguales', {cssClass: 'alerta-registro', timeout: 3000});
      setTimeout(()=> {
        this.showing = false;
      }, 3000);  
      return false;
    }

    //Registrar usuario
    this.authService.registrarUsuario(usuario).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Usuario registrado con exito, revisa tu mail para verificar tu cuenta!', {cssClass: 'alert-success', timeout: 3000});
        setTimeout(()=> {
          this.modalReference.close();
          this.modalReference2 = this.modalService.open(this.login);
          this.nombre = ""
          this.apellido = ""
          this.username = ""
          this.contrasena = ""
          this.contrasena2 = ""
          this.codigo_promo = ""
        },3200)
       
      } else if(!data.success) {
        
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        
      }
    });
  }
  onLoginSubmit(){
    const usuario = {
      username: this.usernamelogin,
      contrasena: this.contrasenalogin,
      recuerdame: this.recuerdame
    }
  
    this.auth = this.authService.autenticarUsuario(usuario).subscribe(data => {
      if(data.success) {
        this.authService.almacenarDataUsuario(data.token, data.user);
        this.flashMessage.show('Inicio de sesión exitoso!', {cssClass: 'alert-success', timeout: 5000});
        this.authService.obtenerPerfil().subscribe(data => {
          this.usuario = data.usuario;      
         });
        setTimeout(()=> {
          this.router.navigate(['usuarios/perfil']);
          this.modalReference2.close();
        }, 1000);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alerta-login', timeout: 5000});
      }
    });
  }
  cerrarSesion(){
    this.authService.logout();
    setTimeout(()=> {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

      let currentUrl = this.router.url + '?';
    
      this.router.navigateByUrl(currentUrl)
        .then(() => {
          this.router.navigated = false;        
          this.router.navigate(['/']);
        });

   
    }, 10)
  }
  perfil(){
    setTimeout(()=> {
      this.router.navigate(['/usuarios/perfil']);
    },150)
  
  }
  
}
