import { TestBed } from '@angular/core/testing';
/* VM Management System Services it will include all vm related services */
import { VmsService } from './vms.service';

describe('VmsService', () => {
  let service: VmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
