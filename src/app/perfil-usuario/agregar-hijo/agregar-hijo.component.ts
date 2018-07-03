import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-agregar-hijo',
  templateUrl: './agregar-hijo.component.html',
  styleUrls: ['./agregar-hijo.component.scss']
})
export class AgregarHijoComponent implements OnInit {


nombre: String;
fdenacimiento: String;
sexo: String;
username: String;
@Output() onCerrar = new EventEmitter<boolean>();


  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService
              ) { }

  ngOnInit() {
    this.authService.obtenerPerfil().subscribe(perfil => {   
      this.username =  perfil.usuario.username;
      });
  
  }

 agregarHijo() {
  

   const hijo = {
     username: this.username,
     nombre: this.nombre,
     fdenacimiento: this.fdenacimiento,
     sexo: this.sexo
   }
   this.authService.agregarHijo(hijo).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('Hijo agregado con exito', {cssClass: 'alert-success', timeout: 3000});
      
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
      
      this.flashMessage.show('Error al agregar hijo, intenta nuevamente', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/usuarios/perfil']);
    }
  });
 }
 cerrarModal(){
  this.onCerrar.emit(true);
 }

}
