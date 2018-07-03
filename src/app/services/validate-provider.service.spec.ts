import { TestBed, inject } from '@angular/core/testing';

import { ValidateProviderService } from './validate-provider.service';

describe('ValidateProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateProviderService]
    });
  });

  it('should be created', inject([ValidateProviderService], (service: ValidateProviderService) => {
    expect(service).toBeTruthy();
  }));
});
