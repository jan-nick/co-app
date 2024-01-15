import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { organizationOverviewRoutes } from './organization-overview.routes';
import { OrganizationOverviewComponent } from './organization-overview.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { OrganizationBulletinComponent } from './components/organization-bulletin/organization-bulletin.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [OrganizationOverviewComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzSpaceModule,
    OrganizationBulletinComponent,
    RouterModule.forChild(organizationOverviewRoutes),
    TranslateModule,
  ],
})
export class OrganizationOverviewModule {}
