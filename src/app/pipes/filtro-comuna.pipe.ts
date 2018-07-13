import { Pipe, PipeTransform } from '@angular/core';
import { ActividadesComponent } from '../perfil-usuario/actividades/actividades.component';

@Pipe({
  name: 'filtroComuna',
  pure: false
})
export class FiltroComunaPipe implements PipeTransform {

  transform(actividades: any[], comunas: any[]): any {
    
    let actividadesAux = [];
    if(!actividades) return [];
    if(comunas.length == 0){
      return actividades;
    } else if(comunas.every(this.checkNull)){
      return actividades;
    } else{
        actividades.forEach(actividad => {
          comunas.forEach(comuna => {
            if(comuna != ""){
              if(actividad.comuna.toLowerCase() == comuna.toLowerCase()){
                actividadesAux.push(actividad);
              }
            }
          });
        });
        return actividadesAux;    
    }
 
    
 
      
    /* return comuna
     ? actividades.filter(actividad => (actividad.comuna).toLowerCase().indexOf(comuna.toLowerCase()) !== -1)
     : actividades; */
}
  checkNull(comuna){
    return (comuna == null || comuna == "");
  }
}
