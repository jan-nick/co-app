import { Component } from '@angular/core';
import { OrganizationsService } from '@co-app/organizations/frontend';
import { AuthService } from '@co-app/auth/frontend';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'co-app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly organizations$ = this.authService.auth$.pipe(
    switchMap((auth) =>
      auth
        ? this.organizationsService.findAll({
            where: { members: { some: { userId: auth?.user.id } } },
          })
        : of()
    )
  );

  constructor(
    private readonly authService: AuthService,
    private readonly organizationsService: OrganizationsService
  ) {}
}
