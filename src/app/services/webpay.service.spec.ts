import { TestBed, inject } from '@angular/core/testing';

import { WebpayService } from './webpay.service';

describe('WebpayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebpayService]
    });
  });

  it('should be created', inject([WebpayService], (service: WebpayService) => {
    expect(service).toBeTruthy();
  }));
});
