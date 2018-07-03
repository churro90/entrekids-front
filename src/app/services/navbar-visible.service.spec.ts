import { TestBed, inject } from '@angular/core/testing';

import { NavbarVisibleService } from './navbar-visible.service';

describe('NavbarVisibleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarVisibleService]
    });
  });

  it('should be created', inject([NavbarVisibleService], (service: NavbarVisibleService) => {
    expect(service).toBeTruthy();
  }));
});
