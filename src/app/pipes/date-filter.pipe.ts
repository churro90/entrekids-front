import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(actividades: any[], fecha: Date): any[] {
    if(!actividades) return [];
    let isoFecha = new Date(fecha);
    isoFecha.setHours(0,0,0,0);
    let dateMs = isoFecha.getTime();
    let fechaFinal = new Date(isoFecha.getFullYear(),isoFecha.getMonth(),isoFecha.getDate()+1,0,0,0);
    let fechaFinalMs = fechaFinal.getTime(); 

    return actividades.filter(it => {
     
     return  (dateMs < (new Date(it.fechaInicio).getTime()) && (new Date(it.fechaInicio).getTime()) < fechaFinalMs)  ; 
    });
  }

}
