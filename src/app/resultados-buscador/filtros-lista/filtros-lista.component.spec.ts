import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosListaComponent } from './filtros-lista.component';

describe('FiltrosListaComponent', () => {
  let component: FiltrosListaComponent;
  let fixture: ComponentFixture<FiltrosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
