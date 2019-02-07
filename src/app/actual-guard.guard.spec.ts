import { TestBed, async, inject } from '@angular/core/testing';

import { ActualGuardGuard } from './actual-guard.guard';

describe('ActualGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActualGuardGuard]
    });
  });

  it('should ...', inject([ActualGuardGuard], (guard: ActualGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
