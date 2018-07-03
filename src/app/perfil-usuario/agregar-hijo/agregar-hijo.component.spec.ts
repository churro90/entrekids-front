import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHijoComponent } from './agregar-hijo.component';

describe('AgregarHijoComponent', () => {
  let component: AgregarHijoComponent;
  let fixture: ComponentFixture<AgregarHijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarHijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
