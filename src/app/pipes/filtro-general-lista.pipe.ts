import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroGeneralLista'
})
export class FiltroGeneralListaPipe implements PipeTransform {

  transform(actividades: any[], precio: any[], comuna: any, edad: any[]): any {
    
    
    if((comuna == undefined || comuna == "todas")) {      
      return actividades.filter(actividad => {
        return ((actividad.disponibilidad.plista - actividad.disponibilidad.dcto) >= +precio[0]) 
               && ((actividad.disponibilidad.plista - actividad.disponibilidad.dcto) <= +precio[1])
               && (actividad.disponibilidad.edadMinima >= edad[0])
               && (actividad.disponibilidad.edadMaxima <= edad[1]);
    }); } else {
      return actividades.filter(actividad => {
        return ((actividad.disponibilidad.plista - actividad.disponibilidad.dcto) >= +precio[0]) 
                && ((actividad.disponibilidad.plista - actividad.disponibilidad.dcto) <= +precio[1]) 
                && (actividad.disponibilidad.comuna == comuna)
                && (actividad.disponibilidad.edadMinima >= edad[0])
                && (actividad.disponibilidad.edadMaxima <= edad[1]);
    });
    }
  }

}
