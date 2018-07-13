import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.scss']
})



export class HijosComponent implements OnInit {
usuario:any;
username: any;
mostrarFormulario: boolean;

//HIJO
nombre: any;
apellido: any;
fdenacimiento: any;
foto: any;
minDate = {year: 1900, month: 1, day: 1};

  constructor(private authService: AuthService, private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.obtenerPerfil().subscribe(perfil => {
      this.usuario = perfil.usuario;
      this.username = perfil.usuario.username;
    });
    this.mostrarFormulario = false;
    
  }
  mostrar(){
    this.mostrarFormulario = !this.mostrarFormulario;
  }
  esconder(){
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregarHijo(){
    const hijo = {
      username: this.username,
      nombre: this.nombre,
      apellido: this.apellido,
      fdenacimiento: this.fdenacimiento,
      foto: this.foto
    }
    this.authService.agregarHijo(hijo).subscribe(data => {
     if(data.success) {
       this.flashMessage.show('Hijo agregado con exito', {cssClass: 'accion-exitosa-perfil', timeout: 3000});
       
       setTimeout(()=> {
         this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
 
         let currentUrl = this.router.url + '?';
       
         this.router.navigateByUrl(currentUrl)
           .then(() => {
             this.router.navigated = false;        
             this.router.navigate([this.router.url]);
           });
 
      
       },3200)
      
     } else {
       
       this.flashMessage.show('Error al agregar hijo, intenta nuevamente', {cssClass: 'accion-fallida-perfil', timeout: 3000});
       
     }
   });
  }
eliminarHijo(i){
 let confirmacion = confirm("Seguro que deseas eliminar hijo?");
 if(confirmacion){
   let info = {
     username: this.username,
     i: i
   }
  
  this.authService.eliminarHijo(info).subscribe(data => {
    if(data.success){
      
      alert(data.msg);
       
      setTimeout(()=> {
    
        this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

        let currentUrl = this.router.url + '?';
      
        this.router.navigateByUrl(currentUrl)
          .then(() => {
            this.router.navigated = false;        
       
            this.router.navigate([this.router.url]);
          });

     
      },1500)
    } else{

     alert(data.msg);
    
    }
  });
 }
}

}
