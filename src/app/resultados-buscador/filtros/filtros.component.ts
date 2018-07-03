import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, Injectable, ChangeDetectorRef, OnChanges } from '@angular/core';
import { NouiFormatter } from 'ng2-nouislider';
import {NgbDateStruct, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
//Configuracion datepicker
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

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  providers: [I18n, NgbDatepickerConfig, { provide: NgbDatepickerI18n, useClass: CustomDatePickerI18n}]
})
export class FiltrosComponent implements OnInit, OnChanges {
@ViewChild('nouislider', {read: ElementRef}) slider: ElementRef;
showUbicacion: boolean = false;
ubicacionAux: boolean;
showEdad: boolean = false;
edadAux: boolean;
showCategoria: boolean = false;
categoriaAux: boolean;
showFecha: boolean = false;
fechaAux: boolean;
comunas = [
  "Cerrillos","Cerro Navia","Conchalí" ,"El Bosque","Estación Central","Huechuraba","Independencia",
  "La Cisterna","La Florida","La Pintana","La Granja","La Reina","Las Condes","Lo Barnechea","Lo Espejo",
  "Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolen","Providencia","Pudahuel",
  "Quilicura","Quinta Normal","Recoleta","Renca","San Miguel","San Joaquín","San Ramón","Santiago",
  "Vitacura" 
];
categorias: Array<String> = ["Música", "Arte", "Gimnasia", "Magia"];
@Input() comuna: any;
@Input() fecha: any;
@Input() rangoEdad: any[];
  
@Input() filtroComunas = [false,false,false,false,false,false,false,
                 false, false, false, false, false,false,false,false,
                false,false,false,false,false,false,false,false,false
                ,false,false,false,false,false,false,false,false]; 

@Input() rangoPrecios;
@Output() change: EventEmitter<any[]> = new EventEmitter<any[]>() ;
@Output() changeComunas: EventEmitter<any> = new EventEmitter<any>();
@Output() changeEdad: EventEmitter<any[]> = new EventEmitter<any[]>();
@Output() changeFecha: EventEmitter<any[]> = new EventEmitter<any[]>();


ngDoCheck(){

    this.change.emit(this.rangoPrecios);  
    this.changeComunas.emit(this.comuna);  
    this.changeEdad.emit(this.rangoEdad);  
    this.changeFecha.emit(this.fecha);  
    this.ref.detectChanges(); 
 
 
}
ngOnChanges(){
 
}

sliderConfig: any = {
  behaviour: 'drag',
  connect: true,
  tooltips: [new MyFormatter, new MyFormatter],
  start: [2000, 50000],
  step: 500,
  range: {
    min: 0,
    max: 75000
  },
  pips: {
    mode: 'count',
    density: 10,
    values: 2,
    stepped: true
  }
  

}

sliderConfig2: any = {
  behaviour: 'drag',
  connect: true,
  tooltips: [new MyFormatter2, new MyFormatter2],
  start: [0, 15],
  step: 1,
  range: {
    min: 0,
    max: 15
  },
  pips: {
    mode: 'count',
    density: 10,
    values: 2,
    stepped: true
  }
  

}

  constructor(private ref: ChangeDetectorRef, config: NgbDatepickerConfig, 
              public router: Router) {
    
   }



  ngOnInit() {
    this.ubicacionAux = true;
    this.edadAux = true;
    this.categoriaAux = true;
    this.fechaAux = true;
    this.rangoPrecios = [2000, 50000] 
    this.comuna = "todas";
    this.rangoEdad = [0,15];

  }

  toggleUbicacion(){
    this.showUbicacion = !this.showUbicacion;
    this.ubicacionAux =  !this.ubicacionAux;
  }
  toggleEdad(){
    this.showEdad = !this.showEdad;
    this.edadAux = !this.edadAux
  }
  toggleCategoria(){
    this.showCategoria = !this.showCategoria;
    this.categoriaAux = !this.categoriaAux
  }
  toggleFecha() {
    this.showFecha = !this.showFecha;
    this.fechaAux = !this.fechaAux;
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  reiniciarFiltros(){
    this.rangoPrecios = [2000, 50000] 
    this.comuna = "todas";
    this.rangoEdad = [0,15];
    let fechaAuxiliar = new Date();
    this.fecha = {
      'year': fechaAuxiliar.getFullYear(),
      'month': fechaAuxiliar.getMonth() + 1,
      'day': fechaAuxiliar.getDate()
    }
  }

  vistaLista(){
    this.router.navigate(['resultados/lista']);
  }

  
}

export class MyFormatter implements NouiFormatter {
  to(value: number): string {
    let output = '$' + Math.round(value) ;   
    return output;
  }

  from(value: string): number {
    return Number(value.split(" ")[0]);
  }
  
}
export class MyFormatter2 implements NouiFormatter {
  to(value: number): string {   
    let output = Math.round(value) + 'años' ;   
    return output;
  }

  from(value: string): number {
    return Number(value.split(" ")[0]);
  }
  
}

