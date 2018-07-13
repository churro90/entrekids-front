import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'angular2-cookie/core';


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router,
    private cookieService: CookieService){

    }

  canActivate(){
    if(this.cookieService.get('auth')){
        this.authService.almacenarDataUsuarioFB(this.cookieService.get('auth'), this.cookieService.get('nombre'),this.cookieService.get('balance'));
        if(this.authService.loggedIn()){
            return true;
        }  
    }  else if(this.authService.loggedIn()){
        return true;
    }  else {
          this.router.navigate(['/login']);        
          return false;
      }
  }
}