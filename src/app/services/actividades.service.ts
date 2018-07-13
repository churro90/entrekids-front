import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ActividadesService {


private _url:string =  environment.serverUrl + '/actividades';
authToken: any;

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

  obtenerDisponibilidadActividades(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/disponibilidad/' + id, {headers: headers})
    .map(res => res.json());  
  }
  obtenerDisponibilidadActividadesPopulares(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/disponibilidad-populares/' + id, {headers: headers})
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

  eliminarFavoritos(info){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url + '/eliminar-de-favoritos', info, {headers: headers})
    .map(res => res.json());
  }

  esFavorito(username,actividad){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/es-favorito/'+username+'/'+actividad, {headers: headers})
    .map(res => res.json());
  }

  obtenerActividadesFavoritas(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/actividades-favoritas', {headers: headers})
    .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
