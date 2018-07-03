import { Component, AfterViewInit } from '@angular/core';
import {Router, Event as RouterEvent, NavigationStart,
  NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthProviderService } from './services/auth-provider.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  loading;
  usuario: any;

    constructor(private router: Router, private authService: AuthService,
                private authProvider: AuthProviderService) {
      this.loading = true;
      
    }

    
    ngAfterViewInit() {   
      this.router.events.subscribe((event) => {
        if(event instanceof NavigationStart){
          this.loading = true;
        } else if (
          event instanceof NavigationEnd || 
          event instanceof NavigationCancel
        ) {
          setTimeout(() => this.loading = false, 700);
        }
        
      });
    }
  
}
