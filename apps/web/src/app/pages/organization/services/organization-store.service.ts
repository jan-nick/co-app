import { Injectable } from '@angular/core';
import { OrganizationsService } from '@co-app/organizations/frontend';
import { Organization } from '@prisma/client';
import { BehaviorSubject, Subject, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationStoreService {
  private readonly refreshSubject = new BehaviorSubject(null);

  private readonly organizationSubject = new Subject<Organization>();
  readonly organization$ = this.organizationSubject.asObservable();

  private organizationId: string | undefined;

  constructor(private readonly organizationsService: OrganizationsService) {}

  init(organizationId: string) {
    this.organizationId = organizationId;
    this.refreshSubject
      .pipe(
        switchMap(() =>
          this.organizationsService.findOne(organizationId).pipe(take(1))
        )
      )

      .subscribe((organization) => {
        this.organizationSubject.next(organization);
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
