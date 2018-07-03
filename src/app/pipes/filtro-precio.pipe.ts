import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPrecio',
  pure: false
})
export class FiltroPrecioPipe implements PipeTransform {

  transform(actividades: any[], precio: any[]): any {
  
    return actividades.filter(actividad => {
        return  ((actividad.plista - actividad.dcto) >= +precio[0]) && ((actividad.plista - actividad.dcto) <= +precio[1]);
    });
  }

}
