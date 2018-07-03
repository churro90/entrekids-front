import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionProveedorComponent } from './creacion-proveedor.component';

describe('CreacionProveedorComponent', () => {
  let component: CreacionProveedorComponent;
  let fixture: ComponentFixture<CreacionProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreacionProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
