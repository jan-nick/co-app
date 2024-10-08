import { Component } from '@angular/core';
import { VotesStoreService } from './services/votes-store.service';
import { map } from 'rxjs';
import { DefaultOrganizationRole } from '@co-app/types';
import { OrganizationStoreService } from '../../services/organization-store.service';

@Component({
  selector: 'co-app-organization-participation',
  templateUrl: './organization-participation.component.html',
  styleUrl: './organization-participation.component.scss',
})
export class OrganizationParticipationComponent {
  readonly votes$ = this.votesStoreService.votes$.pipe(
    map((votes) => {
      const now = new Date();
      const ongoing = votes.filter(
        ({ startsAt, endsAt }) => now > startsAt && now < endsAt
      );
      const upcoming = votes.filter(({ startsAt }) => now < startsAt);
      const closed = votes.filter(({ endsAt }) => now > endsAt);
      return { ongoing, upcoming, closed };
    })
  );
  readonly userIsAdminOrRepresentative$ =
    this.organizationStoreService.userOrganizationRole$.pipe(
      map(
        (role) =>
          role?.name === DefaultOrganizationRole.Admin ||
          role?.name === DefaultOrganizationRole.Representative
      )
    );

  constructor(
    private readonly organizationStoreService: OrganizationStoreService,
    private readonly votesStoreService: VotesStoreService
  ) {}
}
