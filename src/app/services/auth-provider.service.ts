import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment'
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthProviderService {
authToken: any;
proveedor: any;
private _url:string =  environment.serverUrl + '/proveedores';

  constructor(private http: Http) { }

  registrarProveedor(proveedor){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url +'/registrarse', proveedor, {headers: headers})
    .map(res => res.json());
  }
  autenticarProveedor(proveedor){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url +'/autenticarse', proveedor, {headers: headers})
    .map(res => res.json());
  }

  almacenarDataProveedor(token, proveedor){
    localStorage.setItem('id_provider_token', token);
    localStorage.setItem('proveedor', JSON.stringify(proveedor));
    this.authToken = token;
    this.proveedor = proveedor;
  }

  obtenerPerfil(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url +'/perfil', {headers: headers})
    .map(res => res.json());
  }  


  loadToken(){
    const token = localStorage.getItem('id_provider_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_provider_token');
  }

  logout(){
    this.authToken = null;
    this.proveedor = null;
    localStorage.clear();
  }
}
