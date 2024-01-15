import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrganizationComponent } from './organization.component';
import { organizationRoutes } from './organization.routes';
import { OrganizationSideMenuComponent } from './components/organization-side-menu/organization-side-menu.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { OrganizationBreadcrumbsComponent } from './components/organization-breadcrumbs/organization-breadcrumbs.component';

@NgModule({
  declarations: [OrganizationComponent],
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    RouterModule.forChild(organizationRoutes),
    OrganizationBreadcrumbsComponent,
    OrganizationSideMenuComponent,
    TranslateModule,
  ],
})
export class OrganizationModule {}
