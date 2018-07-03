import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
username: String;
password: String;
recuerdame = false;


  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService
              ) { }

  ngOnInit() {
  }
  
  onLoginSubmit(){
    const usuario = {
      username: this.username,
      password: this.password,
      recuerdame: this.recuerdame
    }
  
    this.authService.autenticarUsuario(usuario).subscribe(data => {
      if(data.success) {
        this.authService.almacenarDataUsuario(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        setTimeout(()=> {
          this.router.navigate(['usuarios/perfil']);
        }, 500)
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alerta-login', timeout: 5000});
      }
    });
  }
}
