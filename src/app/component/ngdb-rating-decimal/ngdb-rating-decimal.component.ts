import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ngdb-rating-decimal',
  templateUrl: './ngdb-rating-decimal.component.html',
  styleUrls: ['./ngdb-rating-decimal.component.scss'],
  providers: [NgbRatingConfig]
})
export class NgdbRatingDecimalComponent implements OnInit {

  constructor(config: NgbRatingConfig) { 
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {
  }

}
