import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '@prisma/client';
import { OrganizationStoreService } from '../../../../services/organization-store.service';
import { MembersService } from '@co-app/members/frontend';
import { Observable, switchMap } from 'rxjs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MemberWithUser } from '@co-app/types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'co-app-members-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, TranslateModule],
  templateUrl: './members-table.component.html',
  styleUrl: './members-table.component.scss',
})
export class MembersTableComponent {
  @Input() members: Member[] | null | undefined;

  readonly members$ = this.organizationStoreService.organization$.pipe(
    switchMap(
      (organization) =>
        this.membersService.findAll({
          where: { organizationId: organization.id },
          include: { user: true },
        }) as Observable<MemberWithUser[]>
    )
  );

  constructor(
    private readonly membersService: MembersService,
    private readonly organizationStoreService: OrganizationStoreService
  ) {}
}
