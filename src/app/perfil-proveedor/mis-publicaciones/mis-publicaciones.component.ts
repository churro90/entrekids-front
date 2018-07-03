import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ProviderService } from '../../services/provider.service';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { unitOfTime } from 'moment';
/* import { constants } from 'fs'; */
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, NavigationEnd } from '@angular/router';
 
@Component({
  selector: 'app-mis-publicaciones',
  templateUrl: './mis-publicaciones.component.html',
  styleUrls: ['./mis-publicaciones.component.scss']
})
export class MisPublicacionesComponent implements OnInit {
calendarOptions: Options;
eventsColor = ['blue','green','yellow','orange','purple','red']

@ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private providerService: ProviderService, private changeDetectorRef: ChangeDetectorRef,
              private modalService: NgbModal, private flashMessage: FlashMessagesService,
              private router: Router) { }

eventos: any = [];
caracteres: Number;
nombres: any=[];
closeResult: String;
modalReference: NgbModalRef;
/* modalContent: any = {
  id: String,
  title: String,
  start: Date,
  end: Date,
  descripcion: String,
  direccion: String,
  numeroDireccion: String,
  stock: Number,
  plista: Number,
  dcto: Number,
  fotos: Array,
  categoria: String,
  tipo: String,
  modalidad: String,
  edadMinima: Number,
  edadMaxima: Number,
  sexo: String
}; */

//NG MODELS
id: any;
nombre: any;
nombreInicial: any;
start: any;
end: any;
direccion: any;
numeroDireccion: any;
plista: any;
fotos: any; 
descripcion: any;
stock: any;
dcto: any;
categoria: any;
modalidad: any;
tipo: any;
edadMinima: any;
edadMaxima: any;
sexo: any;
todas: any;



  ngOnInit() {
   this.todas = false;

        
  this.providerService.obtenerActividadesProveedor().subscribe(data => {

    let actividades = data.actividades;
    actividades.forEach((actividad) => {
      this.nombres.push(actividad.nombre);
      this.eventos.push({
        id: actividad._id,
        title: actividad.nombre,
        start: actividad.fechaInicio,
        end: actividad.fechaTermino,
        descripcion: actividad.descripcion,
        direccion: actividad.direccion,
        numeroDireccion: actividad.numeroDireccion,
        stock: actividad.stock,
        plista: actividad.plista,
        dcto: actividad.dcto,
        fotos: actividad.fotos,
        categoria: actividad.categoria,
        tipo: actividad.tipo,
        modalidad: actividad.modalidad,
        edadMinima: actividad.edadMinima,
        edadMaxima: actividad.edadMaxima,
        sexo: actividad.sexo,
        color: 'blue'        
      });  
     
    });


    uniq(this.nombres).forEach((nombre, i) => {
      this.eventos.forEach((evento) => {
        if(evento.title === nombre) {
          evento.color = this.eventsColor[i];
        }
      });
    });
   


    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      buttonText: {
        today: 'Hoy',
        month:    'Mes',
        week:     'Semana',
        day:      'Día',
        list:     'Lista'
      },
      aspectRatio: 2,
      minTime: moment.duration('08:00:00'),
      maxTime: moment.duration('22:00:00'),
      slotDuration: moment.duration('00:15:00'),
      slotLabelInterval: moment.duration('01:00:00'),
      locale: 'es-CL',
      events: this.eventos
    };
    
 
   
  });
   
  //obtiene nombres unicos de actividades
  function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
} 

    
  }
  contarCaracteres(event: any){
    this.caracteres = 250 - this.descripcion.length;
  }
  open(content, e: any) {
    
      this.nombre = e.event.title;
      this.nombreInicial = e.event.title;
      this.id = e.event.id;
      this.start = e.event.start;
      this.end = e.event.end;
      this.descripcion = e.event.descripcion;
      this.direccion = e.event.direccion;
      this.numeroDireccion = e.event.numeroDireccion;
      this.stock = e.event.stock;
      this. plista = e.event.plista;
      this. dcto = e.event.dcto;
      this. fotos = e.event.fotos;
      this. categoria = e.event.categoria;
      this. tipo = e.event.tipo;
      this. modalidad = e.event.modalidad;
      this. edadMinima = e.event.edadMinima;
      this. edadMaxima = e.event.edadMaxima;
     this. sexo = e.event.sexo;
    
    this.descripcion = e.event.descripcion;
    this.caracteres = 250 - e.event.descripcion.length;

/*     this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }); */
    this.modalReference = this.modalService.open(content, {size: 'lg'});
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
  

  onSubmit() {
   const actividadActualizada = {
      id: this.id,
      nombre: this.nombre,
      nombreInicial: this.nombreInicial,
      descripcion: this.descripcion,
      stock: this.stock,
      dcto: this.dcto,
      categoria: this.categoria,
      tipo: this.tipo,
      modalidad: this.modalidad,
      edadMinima: this.edadMinima,
      edadMaxima: this.edadMaxima,
      sexo: this.sexo,
      todas: this.todas
    }
    this.providerService.actualizarActividades(actividadActualizada).subscribe(data => {
      if(data.success) {
        console.log(data);
        this.flashMessage.show('Actividad actualizada con exito', {cssClass: 'alert-success', timeout: 3000});
        setTimeout(()=> {
          this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  
          let currentUrl = this.router.url + '?';
        
          this.router.navigateByUrl(currentUrl)
            .then(() => {
              this.router.navigated = false;
              this.modalReference.close();
              this.router.navigate([this.router.url]);
            });
  
       
        },3200)
        
      } else {
        console.log(data.err);
        this.flashMessage.show('Hubo un error actualizando la información, intenta nuevamente', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/proveedores/perfil/mis-publicaciones']);
      }
    });
  }

}
