import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-indicador-completitud',
  templateUrl: './indicador-completitud.component.html',
  styleUrls: ['./indicador-completitud.component.scss']
})
export class IndicadorCompletitudComponent implements OnInit {
usuario: any;
completitud: number;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.completitud = 0;
    this.authService.obtenerPerfil().subscribe(perfil => {
      this.usuario = perfil.usuario;
      if(perfil.usuario.telefono != undefined && perfil.usuario.telefono != ""){
        this.completitud += 20;
      }
      if(perfil.usuario.direccion && perfil.usuario.numeroDireccion) {
        this.completitud += 20;
      }
      if(perfil.usuario.hijos.length > 0){
        this.completitud += 20;
      }
      if(perfil.usuario.cuidadores.length > 0) {
        this.completitud += 20;
      }
      if(perfil.usuario.metodosDePago.length > 0) {
        this.completitud += 20;
      }
      console.log(this.completitud);
    });
  
 
  }

}
