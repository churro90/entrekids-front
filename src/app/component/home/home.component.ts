declare const google:any;
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarVisibleService } from '../../services/navbar-visible.service';
import { Router } from '@angular/router';
/* import * as googlemaps from '@google/maps'; */
/* import {} from '@types/googlemaps';  */
import { MapTypeStyle } from '@google/maps';
/* import { mapStyle } from '../../../assets/mapstyle'; */




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  lat: any;
  lng: any; 
  public mapTypeStyle: google.maps.MapTypeStyle[] = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"poi","elementType":"labels", "stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]


  constructor(public nav: NavbarVisibleService,
              private authService: AuthService,
              private router: Router) {
                

               }

  ngOnInit() {
    
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
      zoom: 14,
      center: myLatLng,
      styles: this.mapTypeStyle    
    }
  
     this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp); 
    
/* 
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map
    }); */
  
}
  

registrate(){
  this.authService.popup.next('open');
}
iniciaSesion(){
   this.authService.popupLogin.next('open'); 
}
actividades(){
   this.router.navigate(['/resultados/calendario']);
}

showPosition(position) {
  this.lat = position.coords.latitude;
  this.lng = position.coords.longitude;

  let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  this.map.panTo(location);

}

}
