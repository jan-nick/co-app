import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@co-app-env';
import { Observable, Subject, debounceTime, first, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly handle401ErrorSubject = new Subject<boolean>();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.handle401ErrorSubject
      .pipe(
        debounceTime(200),
        switchMap(() => this.authService.auth$.pipe(first()))
      )
      .subscribe(async (auth) => {
        if (auth && auth.user && auth.accessToken) {
          await this.authService.logout(auth, { skipRequest: true });
        }

        this.router.navigate(['']);
      });
  }

  intercept(
    request: HttpRequest<unknown>,
    handler: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.getToken();

    try {
      const requestOrigin = new URL(request.url).origin;
      const backendOrigin = new URL(environment.backendUrl).origin;

      if (token && requestOrigin === backendOrigin) {
        request = this.addTokenToRequest(request, token);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}

    return handler.handle(request).pipe(
      tap({
        error: (error) => {
          if (
            error.status === 401 &&
            !request.headers.get('X-Ignore-Auth-Interceptor')
          ) {
            this.handle401ErrorSubject.next(true);
          }
        },
      })
    );
  }

  private getToken() {
    const auth = localStorage.getItem('auth');
    return auth && JSON.parse(auth).accessToken;
  }

  private addTokenToRequest(request: HttpRequest<unknown>, token: string) {
    return request.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }
}
