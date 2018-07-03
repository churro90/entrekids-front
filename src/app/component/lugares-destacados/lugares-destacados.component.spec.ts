import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LugaresDestacadosComponent } from './lugares-destacados.component';

describe('LugaresDestacadosComponent', () => {
  let component: LugaresDestacadosComponent;
  let fixture: ComponentFixture<LugaresDestacadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugaresDestacadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LugaresDestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
