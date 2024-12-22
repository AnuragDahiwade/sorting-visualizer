import { TestBed } from '@angular/core/testing';

import { ArrayGeneratorService } from './array-generator.service';

describe('ArrayGeneratorService', () => {
  let service: ArrayGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
