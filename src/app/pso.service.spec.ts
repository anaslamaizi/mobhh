import { TestBed } from '@angular/core/testing';

import { PsoService } from './pso.service';

describe('PsoService', () => {
  let service: PsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
