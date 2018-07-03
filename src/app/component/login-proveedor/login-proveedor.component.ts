import { Component, OnInit } from '@angular/core';
import { AuthProviderService } from '../../services/auth-provider.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login-proveedor',
  templateUrl: './login-proveedor.component.html',
  styleUrls: ['./login-proveedor.component.scss']
})
export class LoginProveedorComponent implements OnInit {
username: String;
password: String;
recuerdame = false;

  constructor(private authProvider: AuthProviderService,
              private router: Router,
              private flashMessage: FlashMessagesService

              ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const proveedor = {
      username: this.username,
      password: this.password,
      recuerdame: this.recuerdame
    }
    this.authProvider.autenticarProveedor(proveedor).subscribe(data => {
      if(data.success) {
        
        this.authProvider.almacenarDataProveedor(data.token, data.proveedor);
        this.flashMessage.show('Login con exito', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['proveedores/perfil']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alerta-login', timeout: 5000});
      }
    });
  }
}
