import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuidadores',
  templateUrl: './cuidadores.component.html',
  styleUrls: ['./cuidadores.component.scss']
})
export class CuidadoresComponent implements OnInit {
mostrarFormulario: boolean;
usuario: any;
username: any;

//DATOS CUIDADOR
nombre: any;
apellido: any;
rut: any;
email: any;
telefono: any;

  constructor(private authService:AuthService, private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.mostrarFormulario = false;
    this.authService.obtenerPerfil().subscribe(perfil => {
      this.usuario = perfil.usuario;
      this.username = perfil.usuario.username;
    })
  }

  mostrar(){
    this.mostrarFormulario = !this.mostrarFormulario
  }
  esconder(){
    this.mostrarFormulario = !this.mostrarFormulario
  }
  agregarCuidador(){
    const cuidador = {
      username: this.username,
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      email: this.email,
      telefono: this.telefono
    }
    this.authService.agregarCuidador(cuidador).subscribe(data => {
     if(data.success) {
       this.flashMessage.show(data.msg, {cssClass: 'accion-exitosa-perfil', timeout: 3000});
       
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
       
       this.flashMessage.show(data.mng, {cssClass: 'accion-fallida-perfil', timeout: 3000});
       
     }
   });
  }
  eliminarCuidador(i){
    let confirmacion = confirm("Seguro que deseas eliminar cuidador?");
    if(confirmacion){
      let info = {
        username: this.username,
        i: i
      }
     
     this.authService.eliminarCuidador(info).subscribe(data => {
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
