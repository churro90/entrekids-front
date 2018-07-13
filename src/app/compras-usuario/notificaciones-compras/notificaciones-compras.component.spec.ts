import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesComprasComponent } from './notificaciones-compras.component';

describe('NotificacionesComprasComponent', () => {
  let component: NotificacionesComprasComponent;
  let fixture: ComponentFixture<NotificacionesComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
