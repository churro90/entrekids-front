import { Component, OnInit, ViewChild } from '@angular/core';
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
    lng: any;
    lat: any;

    sliderConfig: any = {
      behaviour: 'drag',
      connect: true,
      start: [2000, 50000],
      step: 500,
      range: {
        min: 0,
        max: 75000
      }
      
    }  

//ESTILO MAPA
public mapTypeStyle: google.maps.MapTypeStyle[] = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"poi","elementType":"labels", "stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}];
  constructor(public nav: NavbarVisibleService,
              private actividadesService: ActividadesService,
               ) { }
  
  ngOnInit() { 
   this.actividadesService.obtenerActividades().subscribe(data => {
     this.actividades = data.actividades;
     this.actividades.forEach((actividad) => {
      this.actividadesService.obtenerDetalleActividades(actividad._id).subscribe(data2 => {
        let lat =(data2.direccion[0].geometry.location.lat);
        let lng =(data2.direccion[0].geometry.location.lng);
        let latLngAux = new google.maps.LatLng(lat,lng); 
        var marker = new google.maps.Marker({
           position: latLngAux,
           map: this.map
         });
         var contentString = `
         <img style="width:175px; height: 95px;"src="https://curico.cl/sitio/wp-content/uploads/2016/11/tenis-kids.jpg">
         <h2 style="font-family: 'Avenir Next'; font-size: 12px; color: #1EB2E8; line-height:16px;">${actividad.nombre}</h2>
         <p style="font-family: 'Avenir Next'; font-size: 9px; color: #000000; line-height:12px; letter-spacing:0.18px;">${actividad.direccion},${actividad.numeroDireccion}</p>
         <p style="font-family: 'Avenir Next'; font-size: 9px; color: #000000; line-height:12px; letter-spacing:0.18px;">${actividad.descripcion}</p>
         `
         var infowindow = new google.maps.InfoWindow({
           content: contentString
         });
         marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        }); 
      });
     });
   }); 
    this.lng=-33.4724727;
    this.lat=-70.9100262;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    var myLatLng = new google.maps.LatLng(-33.437048, -70.634390);
       
          var mapProp = {
            zoom: 15,
            center: myLatLng,
            styles: this.mapTypeStyle
          }
        
        

          this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

         
  }
  showPosition(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);
  
  }
}
