import { TestBed, async, inject } from '@angular/core/testing';

import { ExtendedUsersResolverServiceGuard } from './extended-users-resolver-service.guard';

describe('ExtendedUsersResolverServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtendedUsersResolverServiceGuard]
    });
  });

  it('should ...', inject([ExtendedUsersResolverServiceGuard], (guard: ExtendedUsersResolverServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
