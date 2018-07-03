import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from '../../services/auth-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authProvider: AuthProviderService, 
              private router: Router) { }

  ngOnInit() {
  }
 
  onLogoutClick(){
    this.authProvider.logout();
    this.router.navigate(['/proveedores'], );
    return false;
  }
}
