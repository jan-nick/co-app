import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@co-app/auth/frontend';

@Component({
  selector: 'co-app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  readonly formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async navigateToLogin() {
    await this.router.navigate(['/login']);
  }

  async navigateToHome() {
    await this.router.navigate(['/home']);
  }

  async submit() {
    this.formGroup.markAllAsTouched();

    const { firstName, lastName, email, password } = this.formGroup.value;

    if (
      this.formGroup.invalid ||
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      return;
    }

    this.loading = true;

    try {
      await this.authService.signUp({ firstName, lastName, email, password });
      await this.navigateToHome();
    } catch (error) {
      this.formGroup.setErrors({ error });
    }

    this.loading = false;
  }
}
