import { Injectable } from '@angular/core';
import { OrganizationsService } from '@co-app/organizations/frontend';
import { Organization, OrganizationRole } from '@prisma/client';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationStoreService {
  private readonly refreshSubject = new BehaviorSubject(null);

  private readonly organizationDataSubject = new Subject<{
    organization: Organization;
    organizationRoles: OrganizationRole[];
  }>();

  readonly organization$ = this.organizationDataSubject.pipe(
    map(({ organization }) => organization),
    shareReplay(1)
  );
  readonly organizationRoles$ = this.organizationDataSubject.pipe(
    map(({ organizationRoles }) => organizationRoles),
    shareReplay(1)
  );

  private organizationId: string | undefined;

  constructor(private readonly organizationsService: OrganizationsService) {}

  init(organizationId: string) {
    this.organizationId = organizationId;
    this.refreshSubject
      .pipe(
        switchMap(() =>
          combineLatest({
            organization: this.organizationsService.findOne(organizationId),
            organizationRoles:
              this.organizationsService.findAllRoles(organizationId),
          })
        )
      )

      .subscribe((organizationData) => {
        this.organizationDataSubject.next(organizationData);
      });
  }

  async update(organization: Partial<Organization>) {
    if (!this.organizationId) return;

    await this.organizationsService.update(this.organizationId, organization);

    this.triggerRefresh();
  }

  triggerRefresh() {
    this.refreshSubject.next(null);
  }
}
