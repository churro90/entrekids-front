import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropDeValorComponent } from './prop-de-valor.component';

describe('PropDeValorComponent', () => {
  let component: PropDeValorComponent;
  let fixture: ComponentFixture<PropDeValorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropDeValorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropDeValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
