import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationStoreService } from '../../../../services/organization-store.service';
import { MembersService } from '@co-app/members/frontend';
import { Observable, switchMap, tap } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MemberWithOrganizationRolesAndUser } from '@co-app/types';
import { TranslateModule } from '@ngx-translate/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'co-app-members-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzTypographyModule, TranslateModule],
  templateUrl: './members-table.component.html',
  styleUrl: './members-table.component.scss',
})
export class MembersTableComponent {
  readonly members$ = this.organizationStoreService.organization$.pipe(
    switchMap(
      (organization) =>
        this.membersService.findAll({
          where: { organizationId: organization.id },
          include: {
            user: true,
            organizationRoles: {
              where: { organizationId: organization.id },
            },
          },
        }) as Observable<MemberWithOrganizationRolesAndUser[]>
    ),
    tap((members) => console.log(members))
  );

  constructor(
    private readonly membersService: MembersService,
    private readonly organizationStoreService: OrganizationStoreService
  ) {}
}
