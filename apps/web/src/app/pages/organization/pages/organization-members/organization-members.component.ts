import { Component } from '@angular/core';
import { DefaultOrganizationRole } from '@co-app/types';
import { map } from 'rxjs';
import { OrganizationStoreService } from '../../services/organization-store.service';

@Component({
  selector: 'co-app-organization-members',
  templateUrl: './organization-members.component.html',
  styleUrl: './organization-members.component.scss',
})
export class OrganizationMembersComponent {
  readonly userIsAdmin$ =
    this.organizationStoreService.userOrganizationRole$.pipe(
      map((role) => role?.name === DefaultOrganizationRole.Admin)
    );

  constructor(
    private readonly organizationStoreService: OrganizationStoreService
  ) {}
}
