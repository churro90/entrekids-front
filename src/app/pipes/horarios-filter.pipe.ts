import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horariosFilter'
})
export class HorariosFilterPipe implements PipeTransform {

  transform(horarios: any[], fecha: Date): any[] {
    if(!horarios) return [];
    let isoFecha = new Date(fecha);
    let dateMs = isoFecha.getTime();
    return horarios.filter(it => {
      return (new Date(it.fechaInicio).getTime()) > dateMs;
    });
  }

}
