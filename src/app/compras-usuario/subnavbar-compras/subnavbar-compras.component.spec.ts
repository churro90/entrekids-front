import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnavbarComprasComponent } from './subnavbar-compras.component';

describe('SubnavbarComprasComponent', () => {
  let component: SubnavbarComprasComponent;
  let fixture: ComponentFixture<SubnavbarComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnavbarComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnavbarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
