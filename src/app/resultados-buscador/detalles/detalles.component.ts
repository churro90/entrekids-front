
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef,ErrorHandler, AfterViewInit} from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/switchMap';
import {} from '@types/googlemaps';
import { LatLngLiteral } from '@agm/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NavbarVisibleService } from '../../services/navbar-visible.service';
import { WebpayService } from '../../services/webpay.service';
import { EventListener } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit, AfterViewInit{
  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
actividad: any;
disponibilidad: any;
id: any;
nombre: any;
direccion: any;
fecha: Date = new Date();
fechaNumero = this.fecha.getTime();
lat: any;
lng: any;

//DETALLES DE PAGO
metodoDePago: any;
cantidad: any;
tarjeta: any;
hijo: any;
persona: any;
precio: any;
//LOGIN
username: any;
password: any;
recuerdame: any;

//MODAL
closeResult: String;
modalReference: NgbModalRef;

promedio:any;
esFavorito: any;
usuario: any;
actividadAux;
usernameAux;

  constructor(private actividadesService: ActividadesService,
              private authService: AuthService,
              public ref: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private flashMessage: FlashMessagesService,
              public nav: NavbarVisibleService,
              private webpayService: WebpayService,
              private activatedRoute: ActivatedRoute
             
            ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let login = params['login'];
  
  });

    this.cantidad = 1;
    this.nav.show();
    this.id = this.route.snapshot.params['id'];
    this.nombre = this.route.snapshot.params['nombre'];
 
    this.actividadesService.obtenerDetalleActividades(this.id).subscribe(data => {     
      this.actividad = data.actividad;
      this.promedio = data.promedio;  
      this.precio = data.actividad.plista - data.actividad.dcto;
      this.direccion = data.direccion;
      this.lat = (this.direccion[0].geometry.location.lat);
      this.lng = (this.direccion[0].geometry.location.lng);
      var myLatLng = new google.maps.LatLng(this.lat,this.lng);
    
   
      var mapProp = {
        zoom: 15,
        center: myLatLng
      }

      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map
      });
    
 }, 
  err => {
    console.log(err);
    return false;
  });
    this.actividadesService.obtenerDisponibilidadActividades(this.nombre).subscribe(data =>{
      this.disponibilidad = data.disponibilidades;
      
    },
    err => {
      console.log(err);
      return false;
     });
     if(this.authService.loggedIn()){
      this.authService.obtenerPerfil().subscribe(perfil => {
      this.usuario = perfil.usuario; 
      this.actividadesService.esFavorito(this.usuario.username, this.id).subscribe(data => {
        this.esFavorito = data.esFavorito;
        console.log(this.esFavorito);
      });    
        
    });
  };        


    }
  ngAfterViewInit(){

  }
  

 open(content){ 
  this.modalReference = this.modalService.open(content, {size: 'lg'});
  this.modalReference.result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});  console.log(this.modalReference);
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

  onSubmit(){
    const usuario = {
      username: this.username,
      password: this.password,
      recuerdame: this.recuerdame
    }
   
    this.authService.autenticarUsuario(usuario).subscribe(data => {
      if(data.success) {
        this.authService.almacenarDataUsuario(data.token, data.user);
        this.flashMessage.show('Inicio de sesión exitoso', {cssClass: 'alert-success', timeout: 3000});
        setTimeout(()=> {
            this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};
  
          let currentUrl = this.router.url;
          
        
          this.router.navigateByUrl(currentUrl)
            .then(() => {
              this.router.navigated = false;
              this.router.navigate([this.router.url]);
              this.modalReference.close();
            
              
            });
        }, 15)
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alerta-login', timeout: 3000});
      }
    });
  }
 
  pagar(){
    if(this.metodoDePago === undefined){
      this.flashMessage.show('Selecciona metodo de pago', {cssClass: 'alerta-login', timeout: 3000})
    } else if(this.cantidad <= 0) {
      this.flashMessage.show('Cantidad debe ser mayor que 0', {cssClass: 'alerta-login', timeout: 3000})
    } else {
      if(this.metodoDePago = 'webpay') {
        
          const monto = this.precio * this.cantidad;
          const cantidad = this.cantidad;
          const metodoDePago = this.metodoDePago;
          const hijo = this.hijo;
          const persona = this.persona;
          const idActividad = this.actividad._id;
          const idProveedor = this.actividad.proveedor._id
          const idUsuario = this.usuario._id
          window.open('http://localhost:3000/webpay/'+monto+'/'+cantidad+'/'+metodoDePago+'/'+hijo+'/'+persona+'/'+idActividad+'/'+idProveedor+'/'+idUsuario);

      }
   
    }
   
  }
  agregarFavoritos(content){
    if(!this.authService.loggedIn()){    
      this.modalReference = this.modalService.open(content, {size: 'lg'});
     } else {
       const info = {
         id: this.actividad._id,
         username: this.usuario.username
       }
       this.actividadesService.agregarFavoritos(info).subscribe(data => {
        console.log(data);
        this.esFavorito = !this.esFavorito
       });
       
    }
  }
}
