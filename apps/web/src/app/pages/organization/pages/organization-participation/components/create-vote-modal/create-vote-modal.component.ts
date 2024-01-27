import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { VotesService } from '@co-app/votes/frontend';
import { OrganizationStoreService } from '../../../../services/organization-store.service';
import { VoteOption } from '@prisma/client';
import { VotesStoreService } from '../../services/votes-store.service';

@Component({
  selector: 'co-app-create-vote-modal',
  standalone: true,
  imports: [
    CommonModule,
    NzDatePickerModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzTypographyModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [TranslatePipe],
  templateUrl: './create-vote-modal.component.html',
  styleUrl: './create-vote-modal.component.scss',
})
export class CreateVoteModalComponent implements OnInit {
  readonly formGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),

    votingPeriod: new FormControl<[Date, Date] | null>(null, [
      Validators.required,
    ]),
  });

  visible = false;

  voteOptionList: string[] = [];

  constructor(
    private readonly organizationStoreService: OrganizationStoreService,
    private readonly translateService: TranslateService,
    private readonly votesService: VotesService,
    private readonly votesStoreService: VotesStoreService
  ) {}

  ngOnInit(): void {
    this.translateService.get(' ').subscribe(() => {
      this.voteOptionList = [
        this.translateService.instant('common.yes'),
        this.translateService.instant('common.no'),
      ];
    });
  }

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
    const { name, description, votingPeriod } = this.formGroup.value;

    if (
      !name ||
      !description ||
      !votingPeriod?.length ||
      !this.voteOptionList?.length
    ) {
      return;
    }

    const [startsAt, endsAt] = votingPeriod;
    const voteOptions: Pick<VoteOption, 'name'>[] = this.voteOptionList.map(
      (name) => ({
        name,
      })
    );

    await this.votesService.create({
      name,
      description,
      startsAt,
      endsAt,
      voteOptions,
      organizationId: organization.id,
    });

    this.votesStoreService.triggerRefresh();

    this.close();
  }
}
