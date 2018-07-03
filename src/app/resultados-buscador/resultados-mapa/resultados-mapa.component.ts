import { Component, OnInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { NavbarVisibleService } from '../../services/navbar-visible.service';
import { ActividadesService } from '../../services/actividades.service';



@Component({
  selector: 'app-resultados-mapa',
  templateUrl: './resultados-mapa.component.html',
  styleUrls: ['./resultados-mapa.component.scss']
})
export class ResultadosMapaComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;
    actividades: any;
    

  constructor(public nav: NavbarVisibleService,
              private actividadesService: ActividadesService,
               ) { }
  
  ngOnInit() {
    this.nav.hide();
    
    var uluru = {lat: -33.408, lng: -70.567};
          var uluru2 = {lat: -33.412, lng: -70.568};
          var uluru3 = {lat: -33.407, lng: -70.566};
          var uluru4 = {lat: -33.411, lng: -70.565};
          var mapProp = {
            zoom: 15,
            center: uluru
          }
       
          this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

          var marker = new google.maps.Marker({
            position: uluru,
            map: this.map
          });
          var marker = new google.maps.Marker({
            position: uluru2,
            map: this.map
          });
          var marker = new google.maps.Marker({
            position: uluru3,
            map: this.map
          });
          var marker = new google.maps.Marker({
            position: uluru4,
            map: this.map
          });
  }
  
}
