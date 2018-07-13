import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
usuario: any;
username: any;

  constructor(private authService: AuthService, private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.obtenerPerfil().subscribe(perfil => {
      this.usuario = perfil.usuario;
      this.username = perfil.usuario.username;
    });
  }
agregarTarjeta(){
  const info = this.username;
  window.open('http://localhost:3000/webpayOC/' + info, '_blank');
}

eliminarTarjeta(i){
  let confirmacion = confirm("Seguro que deseas eliminar tarjeta?");
 if(confirmacion){
   let info = {
     username: this.username,
     i: i
   }
  this.authService.eliminarTarjeta(info).subscribe(data => {
    if(data.success){
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
      this.flashMessage.show(data.msg, {cssClass: 'accion-fallida-perfil', timeout: 3000});
    }
  });
  }
}

}
