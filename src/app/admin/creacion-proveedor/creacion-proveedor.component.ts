import { Component, OnInit } from '@angular/core';
import { ValidateProviderService } from '../../services/validate-provider.service';
import { AuthProviderService } from '../../services/auth-provider.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creacion-proveedor',
  templateUrl: './creacion-proveedor.component.html',
  styleUrls: ['./creacion-proveedor.component.scss']
})
export class CreacionProveedorComponent implements OnInit {
  nombre: String;
  rut: String;
  username: String;
  password: String;
  password2: String;
  plan: String;

  constructor(private validateProvider: ValidateProviderService,
              private authProvider: AuthProviderService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onProviderSubmit(){
    const proveedor = {
      nombre: this.nombre,
      rut: this.rut,
      username: this.username,
      password: this.password,
      password2: this.password2,
      plan: this.plan
      
    }
      //Campos requeridos
      if(!this.validateProvider.validateProvider(proveedor)){
        this.flashMessage.show('Porfavor rellena todos los campos', {cssClass: 'alerta-registro', timeout: 3000});
        return false;
      } 
      //Validar Email
      if(!this.validateProvider.validateUsuario(proveedor.username)){
        this.flashMessage.show('Porfavor usa un email valido', {cssClass: 'alerta-registro', timeout: 3000});
        return false;
      } 
  
      if(!this.validateProvider.validatePassword(proveedor)){
        this.flashMessage.show('Passwords no son iguales', {cssClass: 'alerta-registro', timeout: 3000});
        return false;
      }
  
      //Registrar proveedor
      this.authProvider.registrarProveedor(proveedor).subscribe(data => {
        if(data.success) {
          this.flashMessage.show('Proveedor registrado con exito', {cssClass: 'alert-success', timeout: 3000});
          setTimeout(()=> {
            this.router.navigate(['proveedores/login']);
          },3200)
         
        } else {
          
          this.flashMessage.show(data.msg , {cssClass: 'alert-danger', timeout: 3000});
       
        }
      });
  }
}
