import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@co-app-env';
import {
  Auth,
  LoginCredentials,
  SignUpCredentials,
} from '@co-app/types';
import {
  Observable,
  firstValueFrom,
  fromEvent,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly resource = 'auth';

  protected get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  readonly auth$: Observable<Auth | null> = fromEvent(window, 'auth').pipe(
    startWith(null),
    switchMap(() => {
      const auth = localStorage.getItem('auth');

      if (auth) {
        return of(JSON.parse(auth));
      } else {
        return of(null);
      }
    })
  );

  constructor(private readonly httpClient: HttpClient) {}

  login(credentials: LoginCredentials) {
    return firstValueFrom(
      this.httpClient
        .post<Auth>(`${this.url}/login`, credentials, {
          headers: new HttpHeaders({ 'X-Ignore-Auth-Interceptor': 'true' }),
        })
        .pipe(tap((auth) => this.setAuth(auth)))
    );
  }

  signUp(credentials: SignUpCredentials) {
    return firstValueFrom(
      this.httpClient.post<Auth>(`${this.url}/signup`, credentials, {
        headers: new HttpHeaders({ 'X-Ignore-Auth-Interceptor': 'true' }),
      })
    );
  }

  logout(auth: Auth) {
    return firstValueFrom(
      this.httpClient
        .post<Auth>(`${this.url}/logout`, {
          userId: auth.user.id,
          accessToken: auth.accessToken,
        })
        .pipe(tap(() => this.setAuth(null)))
    );
  }

  private setAuth(auth: Auth | null) {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }

    window.dispatchEvent(new Event('auth'));
  }
}
