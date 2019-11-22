import { TestBed, async, inject } from '@angular/core/testing';

import { GroupDetailResolverServiceGuard } from './group-detail-resolver-service.guard';

describe('GroupDetailResolverServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupDetailResolverServiceGuard]
    });
  });

  it('should ...', inject([GroupDetailResolverServiceGuard], (guard: GroupDetailResolverServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
