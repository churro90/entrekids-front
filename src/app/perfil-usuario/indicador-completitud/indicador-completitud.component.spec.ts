import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorCompletitudComponent } from './indicador-completitud.component';

describe('IndicadorCompletitudComponent', () => {
  let component: IndicadorCompletitudComponent;
  let fixture: ComponentFixture<IndicadorCompletitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorCompletitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorCompletitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
