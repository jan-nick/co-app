import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { organizationParticipationRoutes } from './organization-participation.routes';
import { OrganizationParticipationComponent } from './organization-participation.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { CreateVoteModalComponent } from './components/create-vote-modal/create-vote-modal.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ClosedVotesTableComponent } from './components/closed-votes-table/closed-votes-table.component';
import { OngoingVotesTableComponent } from './components/ongoing-votes-table/ongoing-votes-table.component';
import { UpcomingVotesTableComponent } from './components/upcoming-votes-table/upcoming-votes-table.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [OrganizationParticipationComponent],
  imports: [
    CommonModule,
    ClosedVotesTableComponent,
    CreateVoteModalComponent,
    NzButtonModule,
    NzDividerModule,
    NzPageHeaderModule,
    OngoingVotesTableComponent,
    RouterModule.forChild(organizationParticipationRoutes),
    TranslateModule,
    UpcomingVotesTableComponent,
  ],
})
export class OrganizationParticipationModule {}
