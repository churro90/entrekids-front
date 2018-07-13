import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subnavbar-compras',
  templateUrl: './subnavbar-compras.component.html',
  styleUrls: ['./subnavbar-compras.component.scss']
})
export class SubnavbarComprasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
