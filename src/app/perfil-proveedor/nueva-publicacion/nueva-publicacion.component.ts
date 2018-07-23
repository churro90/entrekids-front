import { Component, ChangeDetectorRef, OnInit, ElementRef, Injectable, ViewChild, SimpleChanges, Input, Renderer2 } from '@angular/core';
import { ProviderService, Horarios } from '../../services/provider.service';
import { AuthProviderService } from '../../services/auth-provider.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { Categorias } from '../../../assets/categorias';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';
import { Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { ImageCropperComponent ,CropperSettings } from "ngx-img-cropper";


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
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatePickerI18n}],
 
})
export class NuevaPublicacionComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;  
  lat: any;
  lng: any;
  latLng: any;
  public mapTypeStyle: google.maps.MapTypeStyle[] = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"poi","elementType":"labels", "stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]},   {
    "featureType": "road.local",
    "elementType": "labels.text",
    "stylers": [
        {
            "visibility": "on"
        }
    ]
}]
public horarioForm: FormGroup;  

categorias = Categorias;
categoriasAux = [];
tipo: any;
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
fotos = [];
modalidad: any;
edadMinima: any;
edadMaxima: any;
paginaWeb: any;
sexo: any;
fechaInicio: Date;
fechaTermino: any;
horaInicio: any;
horaTermino: any;
stock: Number;
plista: any;
dcto: any;
instrucciones: any;
model: any;
local: any;

modalImagen: NgbModalRef;
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
fullday: any;
descuento: any;

position:any;
numeroHorarios: any;
precioPublicacion: number = 0;
tipoDcto: any;
horarios: any;

cuposFD: any;
precioListaFD: any;
precioPublicacionFD: any;
cuidador: any;

//TAGS
tags: any;
formControlValue = '';
tagsActividad = [];


//IMAGE CROPPER
agregarFotos: boolean;
data: any;
cropperSettings: CropperSettings;
@ViewChild('cropper', undefined)
cropper:ImageCropperComponent;

  constructor( private providerService: ProviderService , private authProvider: AuthProviderService, 
                private http: Http, private changeDetectorRef: ChangeDetectorRef, private render: Renderer2,
                private _fb: FormBuilder, private currencyPipe: CurrencyPipe, private modalService: NgbModal,) {
    this.uploader.onCompleteItem = (item:any, response: any, status: any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
      console.log(this.attachmentList);
    }
 /*    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 540;
    this.cropperSettings.height = 350;
    this.cropperSettings.croppedWidth = 540;
    this.cropperSettings.croppedHeight = 350;
    this.cropperSettings.canvasWidth =  800;
    this.cropperSettings.canvasHeight = 600;

    this.data = {}; */
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.data = {};
    this.cropperSettings.width = 540;
    this.cropperSettings.height = 350;
    this.cropperSettings.croppedWidth = 540;
    this.cropperSettings.croppedHeight = 350;
    this.cropperSettings.canvasWidth =  540;
    this.cropperSettings.canvasHeight = 350;
   }

   fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
}

  ngOnInit() {      
  this.agregarFotos = true;
  this.horarioForm = this._fb.group({
    horarios: this._fb.array([
      this.initHorario(),
    ])
  });
  this.lng=-33.4724727;
  this.lat=-70.9100262;
//INICIALIZAR MAPA
var myLatLng = new google.maps.LatLng(-33.437048, -70.634390);
    
  
    var mapProp = {
      zoom: 16,
      center: myLatLng,
      styles: this.mapTypeStyle    
    }
  
     this.map = new google.maps.Map(this.gmapElement.nativeElement , mapProp); 

 

//SUSCRIBIRSE A LOS CAMBIOS DE PRECIOS
    const horarioFormValueChanges$ = this.horarioForm.controls['horarios'].valueChanges;
    horarioFormValueChanges$.subscribe(horarios => {
      this.actualizarPrecioDePublicacion(horarios);
    });

    this.fullday = true;
    this.descuento = true;
    this.ingresoDireccion = false;
    this.numeroHorarios = 1;
    
/*     var mapProp = {
      zoom: 15,
      center: new google.maps.LatLng(-33.445 , -70.660),
    }

    
  this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp); */
  

    this.caracteres = 600;
    this.checked =  [false,false,false,false,false,false,false];
    this.descripcion = "";
    this.validacionActividad = true; //CAMBIAR A FALSE PARA VALIDACION!
    this.validacionB1 = false;
    this.validacionB2 = false;
    this.validacionB3 = false;
    this.validacionB4 = false;

    this.authProvider.obtenerPerfil().subscribe(perfil => {
      this.proveedor = perfil.proveedor;
      this.tags = perfil.proveedor.tags;  
      this.idProveedor = this.proveedor._id;
    },  err => {
      console.log(err);
      return false;
    });

       


  
      }
  
    contarCaracteres(event: any){
      this.caracteres = 600 - this.descripcion.length;
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
     

 }
 inicializarMarker(){
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

  seleccionDias(i , event){

    if(!event.target.classList.contains('dia-activo')){
      this.render.addClass(event.target,'dia-activo');
      this.checked[i]=true;
    
    } else {
      this.render.removeClass(event.target, 'dia-activo');
      this.checked[i]=false;
      
    }

    
  }
  fulldayRadio(number){
    if(number == 1){
      this.fullday = true;     
    } else {
      this.fullday = false;     
    }
  }
  tipoDescuento(tipo, event){ 
    if(tipo == 1){
      this.descuento = true;
      this.dcto = undefined;      
    } else {
      this.descuento = false;
      this.dcto = undefined;
    }
  }
  initHorario(){
    return this._fb.group({
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      cupos: ['', Validators.required],
      precioLista: ['', Validators.required],
      descuento: ['', Validators.required],
      precioPublicacion: ['', Validators.required]
    })
  }

  agregarHorario(){
    const control = <FormArray>this.horarioForm.controls['horarios'];
    control.push(this.initHorario());
  }
  removerHorario(i: number){
    const control = <FormArray>this.horarioForm.controls['horarios'];
    control.removeAt(i);
  }

  actualizarPrecioDePublicacion(horarios: any){
    const control = <FormArray>this.horarioForm.controls['horarios'];
    
    if(this.descuento){
      for(let i in horarios){
        this.precioPublicacion = (horarios[i].precioLista - horarios[i].descuento);
        let precioPublicacionFormateado  = this.currencyPipe.transform(this.precioPublicacion, 'USD', 'symbol-narrow','1.0-2');
        control.at(+i).get('precioPublicacion').setValue(precioPublicacionFormateado, {onlySelf: true, emitEvent: false} );
      }
    } else if(!this.descuento){
      for(let i in horarios) {
        this.precioPublicacion = (horarios[i].precioLista - (horarios[i].precioLista * horarios[i].descuento)/100);
        let precioPublicacionFormateado  = this.currencyPipe.transform(this.precioPublicacion, 'USD', 'symbol-narrow','1.0-2');
        control.at(+i).get('precioPublicacion').setValue(precioPublicacionFormateado, {onlySelf: true, emitEvent: false});
      }
    }
  }
    save(model: Horarios){
      this.horarios = model;
      this.horarios = this.horarios.value.horarios;
      this.tab = this.tab + 1;     
    }
    seleccionCategoria(i , event){
  
      if(!event.target.classList.contains('categoria-activo')){
        this.render.addClass(event.target,'categoria-activo');
        this.categoriasAux.push(this.categorias[i].nombre);  
        
      } else {
   
        this.render.removeClass(event.target,'categoria-activo');
        let index = this.categoriasAux.indexOf(this.categorias[i].nombre)
        this.categoriasAux.splice(index,1);
        
      }
      
    } 

    findChoices(searchText: string){
      
      
      return this.tags.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  
    getChoiceLabel(choice: string) {
     
      if(this.tags.indexOf(choice) > -1){
        this.tagsActividad.push(choice);
        console.log(this.tagsActividad);        
      };
      return '';
    }
    quitarTag(i){
      this.tagsActividad.splice(i,1);
    }

    openImageUploader(content){
      this.modalImagen = this.modalService.open(content, {size: 'lg'});
    }

    agregarFoto(){      
      this.fotos.push(this.data.image);  
      this.data = {};
      this.changeDetectorRef.markForCheck();
    }

    //CREAR ACTIVIDAD
    crearNuevaActividad(){
      if(!this.fullday){
        let nuevaActividad = {
          idProveedor: this.idProveedor,
          nombre: this.nombre,
          descripcion: this.descripcion,
          fechaInicio: this.fechaInicio,
          fechaTermino: this.fechaTermino,
          checked: this.checked,
          fullday: this.fullday,
          horarios: this.horarios,
          direccion: this.direccion,
          numeroDireccion: this.numeroDireccion,
          local: this.local,
          tipo: this.tipo,
          categorias: this.categoriasAux,
          tags: this.tagsActividad,
          cuidador: this.cuidador,
          edadMinima: this.edadMinima,
          edadMaxima: this.edadMaxima,
          paginaWeb: this.paginaWeb,
          fotos: this.fotos,
          instrucciones: this.instrucciones

        }        
       
       this.providerService.registrarActividad(nuevaActividad).subscribe(data => {
        console.log(data);
       }); 
      } else if(this.fullday){
        let nuevaActividad = {
          idProveedor: this.idProveedor,
          nombre: this.nombre,
          descripcion: this.descripcion,
          fechaInicio: this.fechaInicio,
          fechaTermino: this.fechaTermino,
          checked: this.checked,
          fullday: this.fullday,
          cupos: this.cuposFD,
          plista: this.precioListaFD,
          dcto: this.dcto,
          direccion: this.direccion,
          numeroDireccion: this.numeroDireccion,
          local: this.local,
          tipo: this.tipo,
          categorias: this.categoriasAux,
          tags: this.tagsActividad,
          cuidador: this.cuidador,
          edadMinima: this.edadMinima,
          edadMaxima: this.edadMaxima,
          paginaWeb: this.paginaWeb,
          fotos: this.fotos,
          instrucciones: this.instrucciones

        }  
           
       this.providerService.registrarActividad(nuevaActividad).subscribe(data => {
          console.log(data);
         });   
      }
    }
  }
    
  
  


