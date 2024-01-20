import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrganizationMembersComponent } from './organization-members.component';
import { organizationMembersRoutes } from './organization-members.routes';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { MembersTableComponent } from './components/members-table/members-table.component';
import { AddMemberModalComponent } from './components/add-member-modal/add-member-modal.component';

@NgModule({
  declarations: [OrganizationMembersComponent],
  imports: [
    AddMemberModalComponent,
    CommonModule,
    NzButtonModule,
    NzPageHeaderModule,
    MembersTableComponent,
    RouterModule.forChild(organizationMembersRoutes),
    TranslateModule,
  ],
})
export class OrganizationMembersModule {}
