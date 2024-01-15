import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { OrganizationStoreService } from '../../services/organization-store.service';
import { map } from 'rxjs';

@Component({
  selector: 'co-app-organization-breadcrumbs',
  standalone: true,
  imports: [CommonModule, NzBreadCrumbModule, RouterModule, TranslateModule],
  templateUrl: './organization-breadcrumbs.component.html',
  styleUrl: './organization-breadcrumbs.component.scss',
})
export class OrganizationBreadcrumbsComponent {
  readonly organization$ = this.organizationStoreService.organization$;

  readonly currentPath$ = this.router.events.pipe(
    map(() => {
      const pathSegments = this.location.path().split('/');
      const lastPathSegment = pathSegments[pathSegments.length - 1];
      return lastPathSegment;
    })
  );

  constructor(
    private readonly location: Location,
    private readonly organizationStoreService: OrganizationStoreService,
    private readonly router: Router
  ) {}
}
