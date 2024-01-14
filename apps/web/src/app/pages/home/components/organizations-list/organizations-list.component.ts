import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { Organization } from '@prisma/client';
import { TranslateModule } from '@ngx-translate/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'co-app-organizations-list',
  standalone: true,
  imports: [CommonModule, NzListModule, NzTypographyModule, TranslateModule],
  templateUrl: './organizations-list.component.html',
  styleUrl: './organizations-list.component.scss',
})
export class OrganizationsListComponent {
  @Input() organizations: Organization[] | null | undefined;
}
