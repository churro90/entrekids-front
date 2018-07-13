import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horariosFilter'
})
export class HorariosFilterPipe implements PipeTransform {

  transform(actividades: any[], rangoHorario: any[]): any[] {
    if(!actividades) return [];
    
    let rhAux = [
      this.transformarHora(rangoHorario[0]),
      this.transformarHora(rangoHorario[1]),
    ];
    return actividades.filter(it => {
      return (rhAux[0] <= this.transformarFechaInicio(it.fechaInicio) && this.transformarFechaInicio(it.fechaInicio) <= rhAux[1]);
    });
  }
  transformarHora(i){
    return (i/2 + 6)*60;
  }
  transformarFechaInicio(fecha){
    let fechaAux = new Date(fecha);
    return fechaAux.getHours()*60 + fechaAux.getMinutes();
  }
}
