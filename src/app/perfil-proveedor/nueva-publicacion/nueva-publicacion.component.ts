import { Component, ChangeDetectorRef, OnInit, ElementRef, Injectable, ViewChild, SimpleChanges, Input } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { AuthProviderService } from '../../services/auth-provider.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import {} from '@types/googlemaps';

const I18N_VALUES = {
  'cl': {
    weekdays: ['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
    months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  }
}
@Injectable() export class I18n {
  language = 'cl';
}
@Injectable()
export class CustomDatePickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }
  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}

const uri = 'http://localhost:3000/proveedores/agregar-fotos';
@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.component.html',
  styleUrls: ['./nueva-publicacion.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatePickerI18n}]
})
export class NuevaPublicacionComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;  


categorias: Array<String> = ["Música", "Arte", "Gimnasia", "Magia"];
tipos: Array<String> = ["Taller", "Clase", "Actividad"];
modalidades: Array<String> = ["Outdoor", "Delivery", "Dropoff"];
sexos: Array<String> = ["Niño", "Niña", "Unisex"];
dias: Array<String> = ["Do","Lu","Ma","Mi","Ju","Vi","Sa"];
tab: any = 1;

idProveedor: any;
nombre: any;
descripcion: any;
caracteres: Number;
direccion: any;
numeroDireccion: Number;
categoria: any;
tipo: any;
fotos: any;
modalidad: any;
edadMinima: any;
edadMaxima: any;
sexo: any;
fechaInicio: Date;
fechaTermino: any;
horaInicio: any;
horaTermino: any;
stock: Number;
plista: any;
dcto: any;
model: any;

lat: any;
lng: any;
latLng: any;

proveedor:any;
mapa: any;
nuevaLocacion: any;
markers = [];

validacionActividad: boolean;
validacionB1: boolean;
validacionB2: boolean;
validacionB3: boolean;
validacionB4: boolean;
ingresoDireccion: boolean;

uploader:FileUploader = new FileUploader({url: uri});

attachmentList:any = [];

checked: Array<Boolean>;

position:any;

  constructor( private providerService: ProviderService , private authProvider: AuthProviderService, 
                private http: Http, private changeDetectorRef: ChangeDetectorRef) {
    this.uploader.onCompleteItem = (item:any, response: any, status: any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
      console.log(this.attachmentList);
    }
   }

  ngOnInit() {    
    this.ingresoDireccion = false;
    var mapProp = {
      zoom: 15,
      center: new google.maps.LatLng(-33.445 , -70.660),
    }

    
  this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  

    this.caracteres = 250;
    this.checked =  [false,false,false,false,false,false,false];
    this.descripcion = "";
    this.validacionActividad = true; //CAMBIAR A FALSE PARA VALIDACION!
    this.validacionB1 = false;
    this.validacionB2 = false;
    this.validacionB3 = false;
    this.validacionB4 = false;

    this.authProvider.obtenerPerfil().subscribe(perfil => {
      this.proveedor = perfil.proveedor;
      console.log(this.proveedor._id);
      this.idProveedor = this.proveedor._id;
    },  err => {
      console.log(err);
      return false;
    });

       


  
      }
  
    contarCaracteres(event: any){
      this.caracteres = 250 - this.descripcion.length;
    }


    onSubmit() {
   
      const actividad = {
        idProveedor: this.idProveedor,
        nombre: this.nombre,          
        descripcion:this.descripcion,
        fotos: this.attachmentList,
        direccion: this.direccion,
        numeroDireccion: this.numeroDireccion,
        categoria: this.categoria,
        tipo: this.tipo,
        modalidad: this.modalidad,
        edadMinima: this.edadMinima,
        edadMaxima: this.edadMaxima,
        sexo: this.sexo,
        fechaInicio: this.fechaInicio,
        fechaTermino: this.fechaTermino,
        horaInicio: this.horaInicio,
        horaTermino: this.horaTermino,
        stock: this.stock,
        plista: this.plista,
        dcto: this.dcto,
        checked: this.checked
      }
  
      this.providerService.registrarActividad(actividad).subscribe(data => {
       
      });
      
    }
    ngDoCheck(){
      //Validacion
        /* if(this.nombre != undefined && this.descripcion != undefined && this.attachmentList.length > 0
           && this.categoria != "" && this.tipo != "" && this.modalidad != "" && 
           this.edadMinima != undefined && this.edadMaxima != undefined && this.sexo != ""
           && this.fechaInicio != undefined && this.fechaTermino && this.horaInicio != undefined &&
           this.horaTermino != undefined && this.stock !=undefined && this.plista != undefined &&
          this.dcto != undefined && this.direccion != undefined && this.numeroDireccion != undefined){
          this.validacionActividad = true;
        } */
        
       /*  ================DESCOMENTAR PARA VALIDACION!!!!=============================== */
        if(this.nombre != undefined && this.descripcion != ""){ this.validacionB1 = true; }
         if(this.direccion != undefined && this.numeroDireccion != undefined) { this.validacionB2 = true; }
        if(this.categoria != undefined && this.modalidad != undefined && this.tipo != undefined) {this.validacionB3 = true;}
        if(this.edadMinima != undefined && this.edadMaxima != undefined && this.sexo != undefined) { this.validacionB4 = true;} 
      }
    update(value: String){
      this.direccion = value;
    }

    siguiente(){
      this.tab = this.tab + 1;
    }

    atras(){
      this.tab = this.tab - 1;
    }

    mostrarMapa(box, box2){
      this.ingresoDireccion = true;
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.numeroDireccion+''+this.direccion+'&key=AIzaSyBkf4IFAZBZMWVGccoYX8h8Run-4EjkdqI')
      .subscribe(data => {        
        this.mapa = data;
        let direccion = JSON.parse(this.mapa._body);
        this.lat = (direccion.results[0].geometry.location.lat);
        this.lng = (direccion.results[0].geometry.location.lng);
        this.latLng = new google.maps.LatLng(this.lat,this.lng);
        this.map.setCenter(new google.maps.LatLng(this.lat, this.lng));
        this.placeMarker(this.latLng);
        
        
      
        
    }); 

 }
   placeMarker(location){
   if(this.markers.length > 0) { this.markers[0].setMap(null); this.markers = [] }
    var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true,
      
    });
    this.markers.push(marker);
   
  
    google.maps.event.addListener(marker, 'dragend', () =>{
        this.position = marker.getPosition();   
      
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.position.lat()+','+this.position.lng()+'&key=AIzaSyBkf4IFAZBZMWVGccoYX8h8Run-4EjkdqI')
       .subscribe(dataAct => {
      
        this.nuevaLocacion = dataAct;
        let nuevaDireccion = JSON.parse(this.nuevaLocacion._body);
        this.direccion = nuevaDireccion.results[0].address_components[1].long_name;
        this.numeroDireccion = Number(nuevaDireccion.results[0].address_components[0].long_name);
        this.changeDetectorRef.detectChanges();
   
        
      }); 
    });
    
   
  } 
    }
    

  


