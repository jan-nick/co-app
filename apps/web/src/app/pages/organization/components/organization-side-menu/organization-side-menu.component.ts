import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { OrganizationStoreService } from '../../services/organization-store.service';

@Component({
  selector: 'co-app-organization-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzMenuModule,
    NzTypographyModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './organization-side-menu.component.html',
  styleUrl: './organization-side-menu.component.scss',
})
export class OrganizationSideMenuComponent {
  readonly organization$ = this.organizationStoreService.organization$;

  constructor(
    private readonly organizationStoreService: OrganizationStoreService
  ) {}
}
