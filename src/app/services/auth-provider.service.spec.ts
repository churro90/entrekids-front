import { TestBed, inject } from '@angular/core/testing';

import { AuthProviderService } from './auth-provider.service';

describe('AuthProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthProviderService]
    });
  });

  it('should be created', inject([AuthProviderService], (service: AuthProviderService) => {
    expect(service).toBeTruthy();
  }));
});
