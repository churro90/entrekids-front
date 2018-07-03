import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroGeneral'
})
export class FiltroGeneralPipe implements PipeTransform {

  transform(actividades: any[], precio: any[], comuna: any, edad: any[]): any {


    if((comuna == undefined || comuna == "todas")) {      
      return actividades.filter(actividad => {
        return ((actividad.plista - actividad.dcto) >= +precio[0]) 
               && ((actividad.plista - actividad.dcto) <= +precio[1])
               && (actividad.edadMinima >= edad[0])
               && (actividad.edadMaxima <= edad[1]);
    }); } else {
      return actividades.filter(actividad => {
        return ((actividad.plista - actividad.dcto) >= +precio[0]) 
                && ((actividad.plista - actividad.dcto) <= +precio[1]) 
                && (actividad.comuna == comuna)
                && (actividad.edadMinima >= edad[0])
                && (actividad.edadMaxima <= edad[1]);
    });
    }
   
    }

  }

