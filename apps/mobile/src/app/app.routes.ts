import { Route } from '@angular/router';
import { SignedInGuard, SignedOutGuard } from '@co-app/auth/frontend';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Auth
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(
        (m) => m.LoginModule
      ),
    canActivate: [SignedOutGuard],
    data: {
      redirectToOnDeactivate: 'home',
    },
  },

  // Logged in
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [SignedInGuard],
    data: {
      redirectToOnDeactivate: 'login',
    },
  },
];
