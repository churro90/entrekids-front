import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransaccionesService } from '../../services/transacciones.service';
import { ReviewsService } from '../../services/reviews.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.scss']
})
export class ResenasComponent implements OnInit {
 transacciones: any;
 fechaActual: any;
 fechasMs = [];
 closeResult: any;
 modalReference: NgbModalRef;

 idAux: any;
 nombreAux:any;

 rating: any;
 comentario: any;

 us
  constructor(private transaccionesService: TransaccionesService, private modalService: NgbModal,
              private reviewsService: ReviewsService, private router: Router, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.fechaActual = new Date();
    this.transaccionesService.obtenerCompras().subscribe(data => {
      this.transacciones = data.transacciones;
      this.transacciones.forEach((t,i) => {
        let fAux = new Date(t.fechaInicio);
        this.fechasMs[i] = fAux.getTime();
      });
    
    });

  }
  open(content,id,nombre){
    this.idAux = id;
    this.nombreAux = nombre;
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;
    });
   }

 existeResena(){

 }

 agregarResena(id){

   if(this.comentario == undefined && this.rating == undefined){
    this.flashMessage.show('Porfavor rellena los campos', {cssClass: 'accion-fallida-perfil', timeoout: 1500})
   }
   else if(this.comentario == undefined) {
    this.flashMessage.show('Porfavor ingresa un comentario', {cssClass: 'accion-fallida-perfil', timeoout: 1500});
   } else if(this.rating == undefined){
    this.flashMessage.show('Porfavor selecciona una calificación', {cssClass: 'accion-fallida-perfil', timeoout: 1500});
   } else{
    let review = {
      comentario: this.comentario,
      rating: this.rating,
      actividad: id
    }
    this.reviewsService.agregarReview(review).subscribe(data => {
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
 onRatingChange(event){
  this.rating = event.rating;
}

}
