import { TestBed } from '@angular/core/testing';

import { ApplicationpropsService } from './applicationprops.service';

describe('ApplicationpropsService', () => {
  let service: ApplicationpropsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationpropsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
