import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TransaccionesService {
  private _url:string = 'http://localhost:3000/proveedores';
   constructor(private http:Http) { }

   
}
