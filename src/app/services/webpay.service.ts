
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment'
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebpayService {
token: any;
url: any;
private _urlOC: string = environment.serverUrl + '/webpayOC';  
private _urlWP: string= environment.serverUrl + '/webpay';

  constructor(private http: Http) { }

  almacenarDatos(url, token){
    localStorage.setItem('wp_token', token);
    localStorage.setItem('url', url);
    this.token = token;
    this.url = url;
  }

  cargarDatos(){
    this.token = localStorage.getItem('wp_token');
    this.url == localStorage.getItem('url');
  }

  limpiarDatos(){
    this.token = null;
    this.url = null;
    localStorage.clear();
  }

  registroTarjeta(info){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._urlOC +'/'+info, {headers: headers})
    .map(res => res.json());
  }

  autenticarTarjeta(url, token){
    let headers = new Headers();
    headers.append('Authorization', token);
    headers.append('Content-type', 'application/json');
    return this.http.post(url, token, {headers: headers});
    
/*     .map(res => res.json()); */
  }

  pagoWebpay(transaccion){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._urlWP +'/pagar', transaccion, {headers: headers})
    .map(res => res.json());
  }
}
