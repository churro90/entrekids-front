import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ActividadesService {


private _url:string =  environment.serverUrl + '/actividades';

  constructor(private http: Http) { }

  crearPromocion(promocion){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url + '/crear-promocion', promocion, {headers: headers})
    .map(res => res.json());
  }


  obtenerActividades(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url , {headers: headers})
   .map(res => res.json());    
  }

  obtenerDetalleActividades(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/detalles/' + id, {headers: headers})
    .map(res => res.json());  
      
  }

  obtenerDisponibilidadActividades(nombre){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/disponibilidad/' + nombre, {headers: headers})
    .map(res => res.json());  
  }

  obtenerActividadesPopulares(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/actividades-populares', {headers: headers})
    .map(res => res.json());  
  }

  agregarFavoritos(info){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url + '/agregar-a-favoritos', info, {headers: headers})
    .map(res => res.json());
  }

  esFavorito(username,actividad){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/es-favorito/'+username+'/'+actividad, {headers: headers})
    .map(res => res.json());
  }

 
}
