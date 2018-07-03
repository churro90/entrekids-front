import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgdbRatingDecimalComponent } from './ngdb-rating-decimal.component';

describe('NgdbRatingDecimalComponent', () => {
  let component: NgdbRatingDecimalComponent;
  let fixture: ComponentFixture<NgdbRatingDecimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgdbRatingDecimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgdbRatingDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
