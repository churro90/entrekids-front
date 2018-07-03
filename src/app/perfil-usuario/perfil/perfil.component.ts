import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { WebpayService } from '../../services/webpay.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {NgbModal, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ValidateService} from '../../services/validate.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})



export class PerfilComponent implements OnInit {
usuario: Object;
agregarhijo = false;
modal = 1;
username: any;
token: any;
tarjeta: any;
modalReference: NgbModalRef;
newCode: boolean;
msg: any;
mostrarFormulario: boolean;
editar: boolean; 

//CAMBIAR CONTRASEÑA
contrasenaActual: any;
contrasenaNueva: any;
confirmaContrasena: any;

  constructor(private authService: AuthService,
              private router: Router,
              private http: Http,
              private webpayService: WebpayService,
              private activatedRoute: ActivatedRoute,
              private flashMessage: FlashMessagesService,
              private modalService: NgbModal,
              private validateService: ValidateService,
              private ref: ChangeDetectorRef
              ) {
                
               }

  ngOnInit() {
    this.newCode = false;
    this.mostrarFormulario = false;
    this.editar = false;
   /*  this.activatedRoute.queryParams.subscribe(params => {
      let success = params['success'];
       if(success == 'true'){          
      const modalRef = this.modalService.open(NgbdModalContent);     
        modalRef.componentInstance.name = "World"     
      
       }
    }); */
    this.authService.obtenerPerfil().subscribe(perfil => {
      this.usuario = perfil.usuario;
      this.username = perfil.usuario.username;
      

     },
      err => {
        console.log(err);
        return false;
      }
      );

  }

codigoNuevo(usuario){
  
   this.authService.nuevoCodigo(usuario).subscribe(data => {
    this.newCode = true;
    this.msg = data.msg;
  }); 
}  
    Modal(){
      this.agregarhijo = !this.agregarhijo;
        if(this.agregarhijo){
          this.modal = 0.4;
        } else {
          this.modal = 1;
        }
   
    }
 
    onCerrar(boolean) {
      this.Modal();{}
    }

    agregarTarjeta(){
     const info = this.username
      window.open('http://localhost:3000/webpayOC/' + info, '_blank');
  
    
     
    }
    eliminarTarjeta(){
      let tarjeta = {
        numerosTarjeta: this.tarjeta.numerosTarjeta,
        username: this.username
      }
      this.authService.eliminarTarjeta(tarjeta).subscribe((data) =>{
        console.log(data);
        if(data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
          setTimeout(()=> {
            this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

        let currentUrl = this.router.url + '?';
      
        this.router.navigateByUrl(currentUrl)
          .then(() => {
            this.router.navigated = false;        
            this.router.navigate([this.router.url]);
          });
            this.modalReference.close();
            
            
          }, 500)
        }
      });
    }

    open(content, tarjeta) {
      this.tarjeta = tarjeta;   
      this.modalReference = this.modalService.open(content, {size: 'lg'});
    }

    cambiarContrasena(){
      const contrasena = {
        contrasenaActual: this.contrasenaActual,
        contrasenaNueva: this.contrasenaNueva,
        confirmaContrasena: this.confirmaContrasena,
        username: this.username
      }
      console.log(contrasena);
      if(!this.validateService.validateCampos(contrasena)) {
        this.flashMessage.show('Porfavor rellena todos los campos', {cssClass: 'alerta-cambio-contrasena', timeout: 3000});   
        setTimeout(()=> {
       /*    this.showing = false; */
        }, 3000);   
        return false;
      } else if(!this.validateService.validateContrasenaNueva(contrasena)) {
        this.flashMessage.show('Las contraseñas no son iguales', {cssClass: 'alerta-cambio-contrasena', timeout: 3000});   
        setTimeout(()=> {
       /*    this.showing = false; */
        }, 3000); 
      } else {
        this.authService.cambiarContrasena(contrasena).subscribe(data => {
          if(data.success){
            this.flashMessage.show(data.msg, {cssClass: 'cambio-contrasena-exitoso', timeout: 3000});   
            setTimeout(()=> {
           /*    this.showing = false; */
           this.contrasenaActual = undefined;
           this.contrasenaNueva = undefined;
           this.confirmaContrasena = undefined;
           this.mostrarFormulario = !this.mostrarFormulario;
            }, 3000); 
          } else if(!data.success){
            this.flashMessage.show(data.msg, {cssClass: 'alerta-cambio-contrasena', timeout: 3000});   
            setTimeout(()=> {
           /*    this.showing = false; */
           
            }, 3000); 
          }
        });
      }
    }


  }

