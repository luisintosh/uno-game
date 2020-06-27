import { TestBed } from '@angular/core/testing';

import { RealTimeDatabaseService } from './real-time-database.service';

describe('RealTimeDatabaseService', () => {
  let service: RealTimeDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
