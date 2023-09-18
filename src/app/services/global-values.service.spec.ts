import { TestBed } from '@angular/core/testing';

import { GlobalValuesService } from './global-values.service';

describe('GlobalValuesService', () => {
  let service: GlobalValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
