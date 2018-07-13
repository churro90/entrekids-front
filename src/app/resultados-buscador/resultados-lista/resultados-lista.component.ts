import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-resultados-lista',
  templateUrl: './resultados-lista.component.html',
  styleUrls: ['./resultados-lista.component.scss']
})
export class ResultadosListaComponent implements OnInit {
  disponibilidad: any;
  precios: any;
  comuna: any;
  edad: any;
  actividadesPopulares: any;
  filtroActividadProveedor: any;
  existe: Array<Boolean>;
  actividades: any[] = [];
  fechasMs = [];
  fechaActual: any;

  sliderConfig: any = {
    behaviour: 'drag',
    connect: true,
    start: [2000, 50000],
    step: 500,
    range: {
      min: 0,
      max: 75000
    }
    
  }  
  
  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {
    this.fechaActual = new Date();
 this.actividadesService.obtenerActividadesPopulares().subscribe(data => {
  this.actividadesPopulares = data;

  this.actividadesPopulares.forEach((actividad,i) => {
    this.actividadesService.obtenerDisponibilidadActividadesPopulares(actividad._id._id).subscribe(data2 =>{
      this.actividadesPopulares[i].disponibilidad = data2.disponibilidades;  
      this.actividades.push(data2.disponibilidades);
      console.log(this.actividadesPopulares);
      
    });


   
  });


 });

  }

  cambioPrecios(event){
    this.precios = event;
   }
   cambioComunas(event){
     this.comuna = event;
   }
   cambioEdad(event){
     this.edad = event;  
   }

}
