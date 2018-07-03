import { Injectable } from '@angular/core';

@Injectable()
export class ValidateProviderService {

  constructor() { }

  validateProvider(proveedor){
    if(proveedor.nombre == undefined || 
      proveedor.rut == undefined    ||
      proveedor.password == undefined ||
      proveedor.username == undefined ||
      proveedor.plan == undefined){
        return false;
      } else {
        return true;
      }
  }
  
  validatePassword(proveedor){
    if(proveedor.password != proveedor.password2){
      return false;
    } else {
      return true;
    }
  }
  
  validateUsuario(username){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(username);
                            }
  }


