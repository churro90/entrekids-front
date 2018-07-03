import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { 
  AuthService as AuthServiceSocial,
  FacebookLoginProvider, 
  SocialUser
} from 'ng4-social-login';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
nombre: String;
apellido: String;
username: String;
password: String;
password2: String;

private user: SocialUser;
private loggedIn: boolean;

  constructor(private validateService: ValidateService, 
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router,
              private authSocial: AuthServiceSocial
             ) { }

  ngOnInit() {
    this.authSocial.authState.subscribe((user) => {      
      this.user = user;
      this.loggedIn = (user != null);    
      this.authService.autenticarUsuarioFB(this.user).subscribe(data => {
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
      
    });
  }
  
  onRegisterSubmit(){
    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      password: this.password,
      password2: this.password2
      
    }
    //Campos requeridos
    if(!this.validateService.validateRegister(usuario)){
      this.flashMessage.show('Porfavor rellena todos los campos', {cssClass: 'alerta-registro', timeout: 3000});
      return false;
    } 
    //Validar Email
    if(!this.validateService.validateUsuario(usuario.username)){
      this.flashMessage.show('Porfavor usa un email valido', {cssClass: 'alerta-registro', timeout: 3000});
      return false;
    } 

    if(!this.validateService.validatePassword(usuario)){
      this.flashMessage.show('Passwords no son iguales', {cssClass: 'alerta-registro', timeout: 3000});
      return false;
    }

    //Registrar usuario
    this.authService.registrarUsuario(usuario).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Usuario registrado con exito', {cssClass: 'alert-success', timeout: 3000});
        setTimeout(()=> {
          this.router.navigate(['/login']);
        },3200)
       
      } else if(data.err.code === 11000) {
        
        this.flashMessage.show('Ya existe un usuario registrado con ese mail, intenta nuevamente', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/registrarse']);
      }
    });
  }
  signInWithFB(): void {
    this.authSocial.signIn(FacebookLoginProvider.PROVIDER_ID);
    
  }
}
