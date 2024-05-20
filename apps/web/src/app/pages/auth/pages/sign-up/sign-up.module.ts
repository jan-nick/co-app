import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { signUpRoutes } from './sign-up.routes';
import { SignUpComponent } from './sign-up.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzTabsModule,
    NzTypographyModule,
    ReactiveFormsModule,
    RouterModule.forChild(signUpRoutes),
    TranslateModule,
  ],
})
export class SignUpModule {}
