import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routes';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { OrganizationsListComponent } from './components/organizations-list/organizations-list.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    OrganizationsListComponent,
    RouterModule.forChild(homeRoutes),
    TranslateModule,
  ],
})
export class HomeModule {}
