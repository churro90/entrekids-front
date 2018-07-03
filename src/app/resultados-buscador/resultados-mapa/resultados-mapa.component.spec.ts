import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosMapaComponent } from './resultados-mapa.component';

describe('ResultadosMapaComponent', () => {
  let component: ResultadosMapaComponent;
  let fixture: ComponentFixture<ResultadosMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
