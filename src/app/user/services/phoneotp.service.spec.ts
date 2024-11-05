import { TestBed } from '@angular/core/testing';

import { PhoneotpService } from './phoneotp.service';

describe('PhoneotpService', () => {
  let service: PhoneotpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneotpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
