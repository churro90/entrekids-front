import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment'
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';




@Injectable()
export class AuthService {
  authToken: any;
  usuario: any;
  nombre: any;
  balance: any;
 private _url:string = environment.serverUrl + '/usuarios';
 public popup: Subject<any> = new Subject<any>();
 public popupLogin: Subject<any> = new Subject<any>();

  constructor(private http:Http,
              private cookieService: CookieService
              ) { 
        
              }

  registrarUsuario(usuario){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url +'/registrarse', usuario, {headers: headers})
    .map(res => res.json());
  }

  autenticarUsuario(usuario){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    return this.http.post(this._url +'/autenticarse', usuario, {headers: headers})
    .map(res => res.json());
  }

  autenticarUsuarioFB(usuario){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');    
    return this.http.post(this._url +'/autenticarse-con-fb', usuario, {headers: headers})
    .map(res => res.json());
  }

  obtenerPerfil(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._url +'/perfil', {headers: headers})
    .map(res => res.json());
  }  

  actualizarPerfil(usuarioActualizado) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._url +'/perfil/editar', usuarioActualizado, {headers: headers})
    .map(res => res.json());
  }

  nuevoCodigo(usuario){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._url +'/nuevo-codigo', usuario, {headers: headers})
    .map(res => res.json());
  }

  agregarHijo(hijo) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._url +'/perfil/agregar-hijo', hijo, {headers: headers})
     .map(res => res.json());
  }
  eliminarHijo(info) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url +'/eliminar-hijo', info, {headers: headers})
     .map(res => res.json());
  }
  agregarCuidador(cuidador){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this._url +'/agregar-cuidador', cuidador, {headers: headers})
     .map(res => res.json());
  }
  eliminarCuidador(info){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url +'/eliminar-cuidador', info, {headers: headers})
     .map(res => res.json());
  }

  almacenarDataUsuario(token, usuario){
    localStorage.setItem('id_token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.authToken = token;
    this.nombre = usuario.nombre;
    this.balance = usuario.balance;
  }
  almacenarDataUsuarioFB(token, nombre, balance) {
    localStorage.setItem('id_token', token);
    this.authToken = token;
    this.nombre = nombre;
    this.balance = balance;
  }
  eliminarTarjeta(info){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url +'/eliminar-tarjeta', info, {headers: headers})
     .map(res => res.json());
  }
  cambiarContrasena(contrasena){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url +'/cambiar-contrasena', contrasena, {headers: headers})
     .map(res => res.json());
  }
  
   loginFB(){
  
   window.open('http://localhost:3000/usuarios/auth/facebook');
  }
 
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.usuario = null;
    localStorage.clear();
    this.cookieService.remove('auth');
    
  }
}
