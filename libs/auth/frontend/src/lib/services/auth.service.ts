import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@co-app-env';
import { Auth, LoginCredentials, SignUpCredentials } from '@co-app/types';
import {
  BehaviorSubject,
  Observable,
  firstValueFrom,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly resource = 'auth';

  private get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  private readonly authSubject = new BehaviorSubject<Auth | null>(null);
  readonly auth$: Observable<Auth | null> = this.authSubject.pipe(
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

  async logout(auth: Auth, options = { skipRequest: false }) {
    if (!options.skipRequest) {
      await firstValueFrom(
        this.httpClient.post<Auth>(`${this.url}/logout`, {
          userId: auth.user.id,
          accessToken: auth.accessToken,
        })
      );
    }

    this.setAuth(null);
  }

  private setAuth(auth: Auth | null) {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }

    this.authSubject.next(auth);
  }
}
