import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TranslateModule } from '@ngx-translate/core';
import { MembersService } from '@co-app/members/frontend';
import { OrganizationStoreService } from '../../../../services/organization-store.service';
import { firstValueFrom, map } from 'rxjs';
import { DefaultOrganizationRole } from '@co-app/types';

@Component({
  selector: 'co-app-add-member-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './add-member-modal.component.html',
  styleUrl: './add-member-modal.component.scss',
})
export class AddMemberModalComponent {
  readonly formGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });



  visible = false;

  constructor(
    private readonly membersService: MembersService,
    private readonly organizationStoreService: OrganizationStoreService
  ) {}

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.formGroup.reset();
  }

  async save() {
    const organization = await firstValueFrom(
      this.organizationStoreService.organization$
    );
    const email = this.formGroup.value.email;
    if (!email) return;

    await this.membersService.create({
      organizationId: organization.id,
      email,
    });

    this.close();
  }
}
