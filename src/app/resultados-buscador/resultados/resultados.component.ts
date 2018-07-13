import { Component, OnInit, OnChanges, DoCheck, Input, Output, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { NavbarVisibleService } from '../../services/navbar-visible.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { NouiFormatter } from 'ng2-nouislider';
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
 fecha8: Date; 
 @Input() semana: Array<Date>;

 h1: any;

 //FILTROS
 ubicacionAux: boolean;
 edadAux: boolean;
 categoriasAux: boolean;
 preciosAux: boolean;
 proveedoresAux: boolean; 
 selected: any;

 precios: any[];
 comunas: any[] = []; 


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
rangoHorario: any[];
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
              private ref: ChangeDetectorRef,
              private render: Renderer2
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
    sliderConfig: any = {
      behaviour: 'drag',
      connect: true,
      start: [0,34],
      step: 1,
      range: {
        min: 0,
        max: 34
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
    this.rangoHorario = [0,34];
    //FILTROS ESCONDIDOS
    this.ubicacionAux = false;
    this.edadAux = false;
    this.categoriasAux = false;
    this.preciosAux = false;
    this.proveedoresAux = false;
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
      console.log(data.actividades[0].fechaInicio)

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
    this.h1 = this.transformarRangoHorario(this.rangoHorario)
 
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

  transformarRangoHorario(rangoHorario: Array<Number>){
    let rhAux = [];
    switch(rangoHorario[0]){
      case 0: rhAux[0]='6:00 AM'; break;
      case 1: rhAux[0]='6:30 AM'; break;
      case 2: rhAux[0]='7:00 AM'; break;
      case 3: rhAux[0]='7:30 AM'; break;
      case 4: rhAux[0]='8:00 AM'; break;
      case 5: rhAux[0]='8:30 AM'; break;
      case 6: rhAux[0]='9:00 AM'; break;
      case 7: rhAux[0]='9:30 AM'; break;
      case 8: rhAux[0]='10:00 AM'; break;
      case 9: rhAux[0]='10:30 AM'; break;
      case 10: rhAux[0]='11:00 AM'; break;
      case 11: rhAux[0]='11:30 AM'; break;
      case 12: rhAux[0]='12:00 PM'; break;
      case 13: rhAux[0]='12:30 PM'; break;
      case 14: rhAux[0]='1:00 PM'; break;
      case 15: rhAux[0]='1:30 PM'; break;
      case 16: rhAux[0]='2:00 PM'; break;
      case 17: rhAux[0]='2:30 PM'; break;
      case 18: rhAux[0]='3:00 PM'; break;
      case 19: rhAux[0]='3:30 PM'; break;
      case 20: rhAux[0]='4:00 PM'; break;
      case 21: rhAux[0]='4:30 PM'; break;
      case 22: rhAux[0]='5:00 PM'; break;
      case 23: rhAux[0]='5:30 PM'; break;
      case 24: rhAux[0]='6:00 PM'; break;
      case 25: rhAux[0]='6:30 PM'; break;
      case 26: rhAux[0]='7:00 PM'; break;
      case 27: rhAux[0]='7:30 PM'; break;
      case 28: rhAux[0]='8:00 PM'; break;
      case 29: rhAux[0]='8:30 PM'; break;
      case 30: rhAux[0]='9:00 PM'; break;
      case 31: rhAux[0]='9:30 PM'; break;
      case 32: rhAux[0]='10:00 PM'; break;
      case 33: rhAux[0]='10:30 PM'; break;
      case 34: rhAux[0]='11:00 PM'; break;
      
    }
    switch(rangoHorario[1]){
      case 0: rhAux[1]='6:00 AM'; break;
      case 1: rhAux[1]='6:30 AM'; break;
      case 2: rhAux[1]='7:00 AM'; break;
      case 3: rhAux[1]='7:30 AM'; break;
      case 4: rhAux[1]='8:00 AM'; break;
      case 5: rhAux[1]='8:30 AM'; break;
      case 6: rhAux[1]='9:00 AM'; break;
      case 7: rhAux[1]='9:30 AM'; break;
      case 8: rhAux[1]='10:00 AM'; break;
      case 9: rhAux[1]='10:30 AM'; break;
      case 10: rhAux[1]='11:00 AM'; break;
      case 11: rhAux[1]='11:30 AM'; break;
      case 12: rhAux[1]='12:00 PM'; break;
      case 13: rhAux[1]='12:30 PM'; break;
      case 14: rhAux[1]='1:00 PM'; break;
      case 15: rhAux[1]='1:30 PM'; break;
      case 16: rhAux[1]='2:00 PM'; break;
      case 17: rhAux[1]='2:30 PM'; break;
      case 18: rhAux[1]='3:00 PM'; break;
      case 19: rhAux[1]='3:30 PM'; break;
      case 20: rhAux[1]='4:00 PM'; break;
      case 21: rhAux[1]='4:30 PM'; break;
      case 22: rhAux[1]='5:00 PM'; break;
      case 23: rhAux[1]='5:30 PM'; break;
      case 24: rhAux[1]='6:00 PM'; break;
      case 25: rhAux[1]='6:30 PM'; break;
      case 26: rhAux[1]='7:00 PM'; break;
      case 27: rhAux[1]='7:30 PM'; break;
      case 28: rhAux[1]='8:00 PM'; break;
      case 29: rhAux[1]='8:30 PM'; break;
      case 30: rhAux[1]='9:00 PM'; break;
      case 31: rhAux[1]='9:30 PM'; break;
      case 32: rhAux[1]='10:00 PM'; break;
      case 33: rhAux[1]='10:30 PM'; break;
      case 34: rhAux[1]='11:00 PM'; break;
 
  }
  return rhAux;
  }
  seleccionComuna(i , event){
  
    if(!event.target.classList.contains('filtro-activo')){
      this.render.addClass(event.target,'filtro-activo');
      this.comunas[i] = this.comunasAux[i];    
    } else {
      this.render.removeClass(event.target,'filtro-activo');
      this.comunas[i] = "";
      
    }
    
  }
}


