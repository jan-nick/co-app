import { Injectable } from '@angular/core';
import { AuthService } from '@co-app/auth/frontend';
import { MembersService } from '@co-app/members/frontend';
import { OrganizationsService } from '@co-app/organizations/frontend';
import { MemberWithOrganizationRolesAndUser } from '@co-app/types';
import { Organization, OrganizationRole } from '@prisma/client';
import {
  BehaviorSubject,
  Observable,
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
    members: MemberWithOrganizationRolesAndUser[];
    organization: Organization;
    organizationRoles: OrganizationRole[];
  }>();

  readonly organization$ = this.organizationDataSubject.pipe(
    map(({ organization }) => organization),
    shareReplay(1)
  );
  readonly members$ = this.organizationDataSubject.pipe(
    map(({ members }) => members),
    shareReplay(1)
  );
  readonly organizationRoles$ = this.organizationDataSubject.pipe(
    map(({ organizationRoles }) => organizationRoles),
    shareReplay(1)
  );
  readonly userOrganizationRole$ = combineLatest({
    auth: this.authService.auth$,
    organizationRoles: this.organizationRoles$,
  }).pipe(
    map(({ auth, organizationRoles }) =>
      organizationRoles.find((role) => role.id === auth?.user.id)
    )
  );

  private organizationId: string | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly membersService: MembersService,
    private readonly organizationsService: OrganizationsService
  ) {}

  init(organizationId: string) {
    this.organizationId = organizationId;
    this.refreshSubject
      .pipe(
        switchMap(() =>
          combineLatest({
            members: this.membersService.findAll({
              where: { organizationId: organizationId },
              include: {
                user: true,
                organizationRoles: {
                  where: { organizationId: organizationId },
                },
              },
            }) as Observable<MemberWithOrganizationRolesAndUser[]>,
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
