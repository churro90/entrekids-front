import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
fecha: Date = new Date();
fechaNumero = this.fecha.getTime()


  constructor(private router: Router) { }

  ngOnInit() {
  }

}
