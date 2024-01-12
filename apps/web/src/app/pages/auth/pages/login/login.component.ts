import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { LoginError } from '@co-app/types';
import { AuthService } from '@co-app/auth/frontend';
import { isEmpty } from '@co-app/utils/core';

@Component({
  selector: 'co-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email(): AbstractControl {
    return this.formGroup.controls['email'];
  }

  get password(): AbstractControl {
    return this.formGroup.controls['password'];
  }

  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly title: Title,
    private readonly translateService: TranslateService
  ) {
    this.title.setTitle(this.translateService.instant('pages.login.title'));
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(() => this.clearAuthErrors());
  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }

  async submit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) return;

    const email = this.email.value;
    const password = this.password.value;

    this.loading = true;

    try {
      await this.authService.login({ email, password });
      await this.router.navigate(['/home']);
    } catch (error) {
      this.setAuthErrors(error);
    }

    this.loading = false;
  }

  clearAuthErrors() {
    const emailErrors = this.email.errors;
    const passwordErrors = this.password.errors;

    if (!emailErrors && !passwordErrors) return;

    Object.values(LoginError).forEach((code) => {
      if (emailErrors) delete emailErrors[code];
      if (passwordErrors) delete passwordErrors[code];
    });

    if (emailErrors) {
      this.email.setErrors(isEmpty(emailErrors) ? null : emailErrors);
    }

    if (passwordErrors) {
      this.password.setErrors(isEmpty(passwordErrors) ? null : passwordErrors);
    }
  }

  setAuthErrors(errorCode: unknown) {
    if (!errorCode && !typeof LoginError) return;

    const emailErrors = { ...this.email.errors };
    const passwordErrors = { ...this.password.errors };

    switch (errorCode) {
      case LoginError.InvalidCredentials:
        emailErrors[errorCode] = true;
        break;
      default:
        break;
    }

    this.email.setErrors(emailErrors);
    this.password.setErrors(passwordErrors);
  }
}
