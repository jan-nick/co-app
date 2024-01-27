import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { OrganizationStoreService } from '../../../services/organization-store.service';
import { VotesService } from '@co-app/votes/frontend';

@Injectable({
  providedIn: 'root',
})
export class VotesStoreService {
  private readonly refreshSubject = new BehaviorSubject(null);

  readonly votes$ = this.refreshSubject.pipe(
    switchMap(() => this.organizationStoreService.organization$),
    switchMap((organization) =>
      this.votesService.findAll({ where: { organizationId: organization.id } })
    )
  );

  constructor(
    private readonly organizationStoreService: OrganizationStoreService,
    private readonly votesService: VotesService
  ) {}

  triggerRefresh() {
    this.refreshSubject.next(null);
  }
}
