import { TestBed } from '@angular/core/testing';

import { MoveChildService } from './move-child.service';

describe('MoveChildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoveChildService = TestBed.get(MoveChildService);
    expect(service).toBeTruthy();
  });
});
