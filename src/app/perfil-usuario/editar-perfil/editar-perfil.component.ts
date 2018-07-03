import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  usuario: Object;
  username: String;
  nombre: String;
  apellido: String;
  celular: String;
  fdenacimiento: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.obtenerPerfil().subscribe(perfil => {
      this.usuario = perfil.usuario;
      this.username =  perfil.usuario.username;
      this.nombre = perfil.usuario.nombre;
      this.apellido = perfil.usuario.apellido;
      this.celular = perfil.usuario.celular;
      this.fdenacimiento = perfil.usuario.fdenacimiento;
      },
      err => {
        console.log(err);
        return false;
      }
      );
  }
  onUpdateSubmit(){
    const usuarioActualizado = {
      username: this.username,
      nombre: this.nombre,
      apellido: this.apellido,
      celular: this.celular,
      fdenacimiento: this.fdenacimiento
    }

  this.authService.actualizarPerfil(usuarioActualizado).subscribe(data => {
    if(data.success) {
      console.log(data);
      this.flashMessage.show('Perfil actualizado con exito', {cssClass: 'alert-success', timeout: 3000});
        setTimeout(()=> {
          this.router.navigate(['/usuarios/perfil']);
        },3200);
    } else {
      console.log(data.err);
      this.flashMessage.show('Hubo un error actualizando tu información, intenta nuevamente', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/usuarios/perfil/editar']);
    }
  })
  }
  

}
