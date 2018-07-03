import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroComuna',
  pure: false
})
export class FiltroComunaPipe implements PipeTransform {

  transform(actividades: any[], comuna): any {   

    return comuna
     ? actividades.filter(actividad => (actividad.comuna).toLowerCase().indexOf(comuna.toLowerCase()) !== -1)
     : actividades;
}

}
