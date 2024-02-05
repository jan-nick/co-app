import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationStoreService } from '../../../../services/organization-store.service';
import { NzTableModule } from 'ng-zorro-antd/table';
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
  readonly members$ = this.organizationStoreService.members$;

  constructor(
    private readonly organizationStoreService: OrganizationStoreService
  ) {}
}
