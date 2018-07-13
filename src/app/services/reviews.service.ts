import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewsService {
  authToken: any;
  private _url:string = environment.serverUrl + '/reviews';
  constructor(private http: Http) { }

  agregarReview(review){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._url +'/agregar-review', review, {headers: headers})
    .map(res => res.json());
  }

  
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
