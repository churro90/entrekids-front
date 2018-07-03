import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/map';


@Injectable()
export class ProviderService {
actividad: any;
authToken: any;
private _url:string = environment.serverUrl + '/proveedores';
  constructor(private http:Http) { }

  registrarActividad(actividad){
    let headers = new Headers();
    let fd = new FormData();
    fd.append('file', actividad.fotosFile);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'multipart/form-data');  
    return this.http.post(this._url +'/agregar-actividad', actividad, {headers: headers})
    .map(res => res.json());    
  }

  subirImagen(formData) {
    let headers = new Headers();
    headers.append('Accept', 'multipart/form-data');
    return this.http.post(this._url +'/agregar-foto', formData, {headers: headers})
    .map(res => res.json());
  }

  obtenerActividadesProveedor(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url + '/obtener-actividades', {headers: headers})
    .map(res => res.json());  
  }

  actualizarActividades(actividadActualizada) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._url +'/editar-actividades', actividadActualizada, {headers: headers})
    .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_provider_token');
    this.authToken = token;
  }
}

