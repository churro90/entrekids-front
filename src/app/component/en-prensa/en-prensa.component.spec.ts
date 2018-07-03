import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnPrensaComponent } from './en-prensa.component';

describe('EnPrensaComponent', () => {
  let component: EnPrensaComponent;
  let fixture: ComponentFixture<EnPrensaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnPrensaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnPrensaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
