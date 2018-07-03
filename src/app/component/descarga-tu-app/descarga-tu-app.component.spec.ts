import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargaTuAppComponent } from './descarga-tu-app.component';

describe('DescargaTuAppComponent', () => {
  let component: DescargaTuAppComponent;
  let fixture: ComponentFixture<DescargaTuAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargaTuAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargaTuAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
