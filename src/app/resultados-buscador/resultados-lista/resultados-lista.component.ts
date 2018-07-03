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
  
  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {
 this.actividadesService.obtenerActividadesPopulares().subscribe(data => {
  this.actividadesPopulares = data;

  this.actividadesPopulares.forEach((actividad,i) => {
    this.actividadesService.obtenerDisponibilidadActividades(actividad._id.nombre).subscribe(data2 =>{
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
