import { Component, OnInit, OnChanges, DoCheck, Input, Output, ChangeDetectorRef } from '@angular/core';
import { NavbarVisibleService } from '../../services/navbar-visible.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { ActividadesService } from '../../services/actividades.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit, DoCheck {
 vista = "lista";
 actividades: any;
 promociones: any;
 dia = 24*60*60*1000
 selectedIndex: number = 0;
 fechaB: any;
 fecha1: Date;
 fecha2: Date ;
 fecha3: Date; 
 fecha4: Date; 
 fecha5: Date; 
 fecha6: Date; 
 fecha7: Date; 
 @Input() semana: Array<Date>;

 precios: any[];
 comunas: any[] = [false,false,false,false,false,false,false,
                   false, false, false, false, false, false,false,false,
                   false,false,false,false,false,false,false,false,false
                   ,false,false,false,false,false,false,false,false]; 
comunasAux = [
  "Cerrillos","Cerro Navia","Conchalí" ,"El Bosque","Estación Central","Huechuraba","Independencia",
  "La Cisterna","La Florida","La Pintana","La Granja","La Reina","Las Condes","Lo Barnechea","Lo Espejo",
  "Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolen","Providencia","Pudahuel",
  "Quilicura","Quinta Normal","Recoleta","Renca","San Miguel","San Joaquín","San Ramón","Santiago",
  "Vitacura" 
];
comuna: any;
edad: any[];
fechaFiltro: Date;
oldFechaFiltro: Date = new Date(0);
 cambioPrecios(event){
  this.precios = event;
 }
 cambioComunas(event){
   this.comuna = event;
 }
 cambioEdad(event){
   this.edad = event;  
 }
 cambioFecha(event){
 if(event != undefined){
  this.fechaFiltro = new Date(event.year, event.month - 1, event.day);
  if(this.fechaFiltro.getTime() != this.oldFechaFiltro.getTime()){
    this.fecha1 = this.fechaFiltro;
    this.fecha2 = new Date(this.fecha1.getTime() + this.dia);
    this.fecha3 = new Date(this.fecha1.getTime() + this.dia*2);
    this.fecha4 = new Date(this.fecha1.getTime() + this.dia*3);
    this.fecha5 = new Date(this.fecha1.getTime() + this.dia*4);
    this.fecha6 = new Date(this.fecha1.getTime() + this.dia*5);
    this.fecha7 = new Date(this.fecha1.getTime() + this.dia*6);
    this.semana = [this.fecha1, this.fecha2, this.fecha3, this.fecha4, this.fecha5, this.fecha6, this.fecha7];   
    this.oldFechaFiltro = this.fechaFiltro;
    this.ref.detectChanges();
  }    

 }
 
 }

 changeDetected=false;
 changeLog: string[] = [];
 oldSemana: Date[] = [];
 oldLogLength = 0;
 noChangeCount = 0;

 filtroActividadProveedor:any;
 
  constructor( public nav: NavbarVisibleService,
              private actividadesService: ActividadesService,
              private router: Router,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef
              ) {  this.fechaB = this.route.snapshot.params['fecha']; 
                 }

    setViewLista() {
      if(this.vista==="lista"){
        return;
      } else {
        this.vista="lista";
      }
    } 
    setViewMapa() {
      if(this.vista==="mapa"){
        return;
      } else {
        this.vista="mapa";
      }
    }
  

    seleccionFecha(index: number) {
      setTimeout(()=> {
        
        this.fecha1 = this.semana[index];
        this.fecha2 = new Date(this.fecha1.getTime() + this.dia);
        this.fecha3 = new Date(this.fecha1.getTime() + this.dia*2);
        this.fecha4 = new Date(this.fecha1.getTime() + this.dia*3);
        this.fecha5 = new Date(this.fecha1.getTime() + this.dia*4);
        this.fecha6 = new Date(this.fecha1.getTime() + this.dia*5);
        this.fecha7 = new Date(this.fecha1.getTime() + this.dia*6);
        this.semana = [this.fecha1, this.fecha2, this.fecha3, this.fecha4, this.fecha5, this.fecha6, this.fecha7];
        
      },300); 
    }

    anteriorSemana(){
      if((this.fecha1.getTime() - this.dia*6) < new Date().getTime()){
       setTimeout(() => { this.fecha1 = new Date();
        this.fecha2 = new Date(this.fecha1.getTime() + this.dia);
        this.fecha3 = new Date(this.fecha1.getTime() + this.dia*2);
        this.fecha4 = new Date(this.fecha1.getTime() + this.dia*3);
        this.fecha5 = new Date(this.fecha1.getTime() + this.dia*4);
        this.fecha6 = new Date(this.fecha1.getTime() + this.dia*5);
        this.fecha7 = new Date(this.fecha1.getTime() + this.dia*6);
        this.semana = [this.fecha1, this.fecha2, this.fecha3, this.fecha4, this.fecha5, this.fecha6, this.fecha7];
       },300);
      } else {
        setTimeout(() => { this.fecha1 = new Date(this.fecha1.getTime() - this.dia*7);
        this.fecha2 = new Date(this.fecha1.getTime() + this.dia);
        this.fecha3 = new Date(this.fecha1.getTime() + this.dia*2);
        this.fecha4 = new Date(this.fecha1.getTime() + this.dia*3);
        this.fecha5 = new Date(this.fecha1.getTime() + this.dia*4);
        this.fecha6 = new Date(this.fecha1.getTime() + this.dia*5);
        this.fecha7 =  new Date(this.fecha1.getTime() + this.dia*6);
        this.semana = [this.fecha1, this.fecha2, this.fecha3, this.fecha4, this.fecha5, this.fecha6, this.fecha7];
        },300);
      }
    }

    proximaSemana() {
      setTimeout(() => {
        this.fecha1 = new Date(this.fecha1.getTime() + this.dia*7)
        this.fecha2 = new Date(this.fecha1.getTime() + this.dia);
        this.fecha3 = new Date(this.fecha1.getTime() + this.dia*2);
        this.fecha4 = new Date(this.fecha1.getTime() + this.dia*3);
        this.fecha5 = new Date(this.fecha1.getTime() + this.dia*4);
        this.fecha6 = new Date(this.fecha1.getTime() + this.dia*5);
        this.fecha7 = new Date(this.fecha1.getTime() + this.dia*6);
        this.semana = [this.fecha1, this.fecha2, this.fecha3, this.fecha4, this.fecha5, this.fecha6, this.fecha7];
      }, 300); 
    }
    
    trackByDate(index: number, semana: Array<Date>) { return semana[index]; }

  ngOnInit() {
    this.edad =[0,100];

    //FECHAS INICIALES
 
  this.fecha1  =  new Date();
  this.fecha2  = new Date(this.fecha1.getTime() + this.dia);
  this.fecha3  =  new Date(this.fecha1.getTime() + this.dia*2);
  this.fecha4  =  new Date(this.fecha1.getTime() + this.dia*3);
  this.fecha5  =  new Date(this.fecha1.getTime() + this.dia*4);
  this.fecha6  =  new Date(this.fecha1.getTime() + this.dia*5);
  this.fecha7  =  new Date(this.fecha1.getTime() + this.dia*6); 
  this.semana =  [this.fecha1, this.fecha2, this.fecha3, this.fecha4, this.fecha5, this.fecha6, this.fecha7];


    this.actividadesService.obtenerActividades().subscribe(data => {
     
      this.actividades = data.actividades;
   

       this.actividades.forEach((actividad) => {
        if(actividad.promociones != undefined){
          actividad.promociones.forEach((promocion) => {
           let t0 = (new Date(promocion.fechaInicio)).getTime();
           let t1 = (new Date()).getTime();
           let t2 = (new Date(promocion.fechaExpiracion)).getTime();
      
        
          if(t0 < t1 && t1 < t2 ){
            if(promocion.regla === 'Edad'){
              if(promocion.cotaMinima <= actividad.edadMinima && promocion.cotaMaxima <= actividad.edadMaxima){
                if(promocion.tipo === 'da'){
                  actividad.dcto = actividad.dcto + (promocion.qty*actividad.plista)/100;
                } else if(promocion.tipo === 'dsd') {
                  actividad.dcto = actividad.dcto + (actividad.plista - actividad.dcto)*promocion.qty/100;
                } else {
                  actividad.dcto = Math.max(actividad.dcto,(promocion.qty*actividad.plista)/100);
                }
              }
            }
          }
          });
        }
      }); 

   
 
  }, 
  err => {
    console.log(err);
    return false;
  });
    this.nav.hide();
  }
  ngAfterViewChecked(){

  }
  ngDoCheck(){
    
 
  }
  ngOnChanges(){

  }

  hoy(){
    this.fecha1  =  new Date();
    this.fecha2  = new Date(this.fecha1.getTime() + this.dia);
    this.fecha3  =  new Date(this.fecha1.getTime() + this.dia*2);
    this.fecha4  =  new Date(this.fecha1.getTime() + this.dia*3);
    this.fecha5  =  new Date(this.fecha1.getTime() + this.dia*4);
    this.fecha6  =  new Date(this.fecha1.getTime() + this.dia*5);
    this.fecha7  =  new Date(this.fecha1.getTime() + this.dia*6); 
    this.semana =  [this.fecha1, this.fecha2, this.fecha3, this.fecha4, this.fecha5, this.fecha6, this.fecha7];
  }

}


