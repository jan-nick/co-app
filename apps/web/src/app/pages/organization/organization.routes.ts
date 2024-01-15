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
    ],
  },
];
