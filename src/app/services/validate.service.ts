import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class ValidateService {

  constructor(private http: HttpClient) { }

validateRegister(usuario){
  if(usuario.nombre == undefined || 
    usuario.apellido == undefined || 
    usuario.contrasena == undefined ||
    usuario.username == undefined){
      return false;
    } else {
      return true;
    }
}

validatePassword(usuario){
  if(usuario.contrasena != usuario.contrasena2){
    return false;
  } else {
    return true;
  }
}

validateUsuario(username){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(username);
                          }

validateCampos(contrasena){
  if(contrasena.contrasenaNueva == undefined || 
    contrasena.contrasenaNueva == undefined  || 
    contrasena.confirmaContrasena == undefined) {
      return false;
  } else {
    return true;
  }
}

validateContrasenaNueva(contrasena){
  if(contrasena.contrasenaNueva != contrasena.confirmaContrasena) {
    return false;
  } else {
    return true;
  }
} 
 

/* validateCodigo(codigo_promocional){
  interface Codigo {
    success: String
  }
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
   return this.http.post<Codigo>('localhost:3000/usuarios/existe-codigo',codigo_promocional, {headers: headers})
   .subscribe(data => {
      if(data.success){
        return true;
      } else {
        return false;
      }
   });
  } */
}