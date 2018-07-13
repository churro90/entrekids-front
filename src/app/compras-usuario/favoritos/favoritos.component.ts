import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
actividadesFavoritas: any;
modalReference: NgbModalRef;
closeResult: String;
username: any;
idAux: any;
nombreAux: any;
  constructor(private actividades: ActividadesService, private modalService: NgbModal, private authService: AuthService,
              private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit() {
    this.authService.obtenerPerfil().subscribe(data => {
      this.username = data.usuario.username;
    });
    this.actividades.obtenerActividadesFavoritas().subscribe(data => {    
      this.actividadesFavoritas = data.actividades;
      
    });
  }

  open(content, id, nombre){
    this.idAux = id,
    this.nombreAux = nombre;
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
    });
   }
   eliminarActividad(id){
     let info = {
       username: this.username,
       id: id
     }
     this.actividades.eliminarFavoritos(info).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass: 'accion-exitosa-perfil', timeoout: 1500})
        setTimeout(()=> {
    
          this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  
          let currentUrl = this.router.url + '?';
        
          this.router.navigateByUrl(currentUrl)
            .then(() => {
              this.router.navigated = false;        
              this.modalReference.close();
              this.router.navigate([this.router.url]);
            });
  
       
        },1500)
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'accion-fallida-perfil', timeoout: 1500})
      }
     });
   }
}
