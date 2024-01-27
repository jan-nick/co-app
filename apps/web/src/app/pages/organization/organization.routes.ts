import { Routes } from '@angular/router';
import { OrganizationComponent } from './organization.component';

export const organizationRoutes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    // canActivate: [SignedOutGuard], // TODO is member guard
    // data: {
    //   redirectToOnDeactivate: '/',
    // },
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadChildren: () =>
          import(
            './pages/organization-overview/organization-overview.module'
          ).then((m) => m.OrganizationOverviewModule),
      },
      {
        path: 'participation',
        loadChildren: () =>
          import(
            './pages/organization-participation/organization-participation.module'
          ).then((m) => m.OrganizationParticipationModule),
      },
      {
        path: 'members',
        loadChildren: () =>
          import(
            './pages/organization-members/organization-members.module'
          ).then((m) => m.OrganizationMembersModule),
      },
    ],
  },
];
