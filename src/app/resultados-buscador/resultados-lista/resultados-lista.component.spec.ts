import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosListaComponent } from './resultados-lista.component';

describe('ResultadosListaComponent', () => {
  let component: ResultadosListaComponent;
  let fixture: ComponentFixture<ResultadosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
