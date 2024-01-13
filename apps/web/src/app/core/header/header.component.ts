import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@co-app/auth/frontend';
import { firstValueFrom, map } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'co-app-header',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzTypographyModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly user$ = this.authService.auth$.pipe(map((auth) => auth?.user));

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async logout() {
    const auth = await firstValueFrom(this.authService.auth$);

    if (auth) {
      await this.authService.logout(auth);
      await this.router.navigate(['']);
    }
  }
}
