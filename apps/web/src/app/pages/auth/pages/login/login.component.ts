import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@co-app/auth/frontend';

@Component({
  selector: 'co-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async navigateToSignUp() {
    await this.router.navigate(['/sign-up']);
  }

  async navigateToHome() {
    await this.router.navigate(['/home']);
  }

  async submit($event: FormDataEvent) {
    $event.preventDefault();
    this.formGroup.markAsDirty();

    const { email, password } = this.formGroup.value;

    if (this.formGroup.invalid || !email || !password) {
      return;
    }

    this.loading = true;

    try {
      await this.authService.login({ email, password });
      await this.navigateToHome();
    } catch (error) {
      this.formGroup.controls.email.setErrors({ error });
      this.formGroup.controls.password.setErrors({ error });
    }

    this.loading = false;
  }
}
