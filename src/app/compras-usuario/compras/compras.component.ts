import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TransaccionesService } from '../../services/transacciones.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
status:boolean;
status2: boolean;
status3: boolean;
username: any;

fechaActual: any;

compras: any;
comprasFuturas: any;
comprasPasadas: any;
  constructor(private authService: AuthService, private transacciones: TransaccionesService) { }

  ngOnInit() {
    this.status = true;
    this.status2 = false; 
    this.status3 = false;
    this.fechaActual = (new Date()).getTime()
    this.transacciones.obtenerCompras().subscribe(data => {
      this.compras = data.transacciones;
    });
    this.transacciones.obtenerComprasPasadas().subscribe(data => {
      this.comprasPasadas = data.transacciones;
    });
    this.transacciones.obtenerComprasFuturas().subscribe(data => {
      this.comprasFuturas = data.transacciones;   
    
  
    });
  }

  estatus(){
    if(this.status == true){
        return;
    } else{
      this.status = true;
      this.status2 = false;
      this.status3 = false;
    } 
  }
  estatus2(){
    if(this.status2 == true){
      return;
    } else {
      this.status = false;
      this.status2 = true;
      this.status3 = false;
    }
  }
  estatus3(){
    if(this.status3 == true){
      return;
    } else {
      this.status = false;
      this.status2 = false;
      this.status3 = true;
    }
  }

}
