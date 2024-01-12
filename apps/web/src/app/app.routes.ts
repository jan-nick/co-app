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
      import('./pages/auth/pages/login/login.module').then(
        (m) => m.LoginModule
      ),
    canActivate: [SignedOutGuard],
    data: {
      redirectToOnDeactivate: 'home',
    },
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/auth/pages/sign-up/sign-up.module').then(
        (m) => m.SignUpModule
      ),
    canActivate: [SignedOutGuard],
    data: {
      redirectToOnDeactivate: 'home',
    },
  },
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
