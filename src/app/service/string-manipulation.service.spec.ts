import { TestBed } from '@angular/core/testing';

import { StringManipulationService } from './string-manipulation.service';

describe('StringManipulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StringManipulationService = TestBed.get(StringManipulationService);
    expect(service).toBeTruthy();
  });
});
