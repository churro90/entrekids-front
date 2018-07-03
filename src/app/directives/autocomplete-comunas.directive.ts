import { Directive, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appAutocompleteComunas]'
})
export class AutocompleteComunasDirective {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;
  defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.523079, -70.802209),
    new google.maps.LatLng(-33.321348, -70.488412));

  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  
  }
  options = {
    types: ['(regions)'],
    bounds: this.defaultBounds,
    componentRestrictions: {country: "cl"}
  };
  ngOnInit(){
    const autocomplete = new google.maps.places.Autocomplete(this.element, this.options);

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.onSelect.emit(place);
    });
  }
  geolocate(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }

}
