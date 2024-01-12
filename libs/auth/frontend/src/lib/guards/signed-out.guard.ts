import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignedOutGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return this.authService.auth$.pipe(
      map((user) => !user),
      tap((canActivate) => {
        if (!canActivate) {
          const redirectTo =
            activatedRouteSnapshot.data['redirectToOnDeactivate'] || '/404';

          this.router.navigate([redirectTo]);
        }
      })
    );
  }
}
