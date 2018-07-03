import { Component, OnInit, Injectable } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import { ActividadesService } from '../../services/actividades.service';

const I18N_VALUES = {
  'cl': {
    weekdays: ['Lu','Ma','Mi','Ju','Vi','Sa','Do'],
    months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  }
}
@Injectable() export class I18n {
  language = 'cl';
}
@Injectable()
export class CustomDatePickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }
  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatePickerI18n}]
})
export class PromocionesComponent implements OnInit {
tipo: any;
regla: any;
qty: any;
cotaMinima: any;
cotaMaxima: any;
genero: any;
fechaInicio: any;
fechaExpiracion: any;
comunas: Array<String> = [
  "Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia",
  "La Cisterna","La Florida","La Pintana","La Granja","La Reina","Las Condes","Lo Barnechea","Lo Espejo",
  "Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolen","Providencia","Pudahuel",
  "Quilicura","Quinta Normal","Recoleta","Renca","San Miguel","San Joaquín","San Ramón","Santiago",
  "Vitacura"
];
comuna: any;


  constructor(private actividadesService: ActividadesService) { }

  ngOnInit() {
    this.cotaMinima = 0;
    this.cotaMaxima = 0;
    this.genero = "";
    this.comuna = "";
  }

  onPromotionSubmit(){
    const promocion = {
      tipo: this.tipo,
      regla: this.regla,
      cotaMinima: this.cotaMinima,
      cotaMaxima: this.cotaMaxima,
      genero: this.genero,
      qty: this.qty,
      comuna: this.comuna,
      fechaInicio: this.fechaInicio,
      fechaExpiracion: this.fechaExpiracion
    }
    console.log(promocion);

   this.actividadesService.crearPromocion(promocion).subscribe(data => {
      console.log(promocion);
   });
  }
}
