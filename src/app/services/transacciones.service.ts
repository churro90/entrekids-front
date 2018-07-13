import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/map';

@Injectable()
export class TransaccionesService {
  private _url:string = environment.serverUrl + '/transacciones';
  authToken: any;
  
   constructor(private http:Http) { }

  obtenerCompras(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url +'/compras', {headers: headers})
    .map(res => res.json());
  }
  obtenerComprasPasadas(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url +'/compras-pasadas', {headers: headers})
    .map(res => res.json());
  }
  obtenerComprasFuturas(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url +'/compras-futuras', {headers: headers})
    .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
