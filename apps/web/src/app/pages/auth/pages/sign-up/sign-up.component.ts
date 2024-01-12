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
import { SignUpError } from '@co-app/types';
import { AuthService } from '@co-app/auth/frontend';
import { isEmpty } from '@co-app/utils/core';

@Component({
  selector: 'co-app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  readonly formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get firstName(): AbstractControl {
    return this.formGroup.controls['firstName'];
  }

  get lastName(): AbstractControl {
    return this.formGroup.controls['lastName'];
  }

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
    this.title.setTitle(this.translateService.instant('pages.sign_up.title'));
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(() => this.clearAuthErrors());
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
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

    Object.values(SignUpError).forEach((code) => {
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
    if (!errorCode && !typeof SignUpError) return;

    const emailErrors = { ...this.email.errors };
    const passwordErrors = { ...this.password.errors };

    switch (errorCode) {
      case SignUpError.EmailTaken:
        emailErrors[errorCode] = true;
        break;
      default:
        break;
    }

    this.email.setErrors(emailErrors);
    this.password.setErrors(passwordErrors);
  }
}
