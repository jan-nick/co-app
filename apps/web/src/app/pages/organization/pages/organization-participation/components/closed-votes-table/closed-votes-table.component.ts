import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vote } from '@prisma/client';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslateModule } from '@ngx-translate/core';
import { VoteResultModalComponent } from '../vote-result-modal/vote-result-modal.component';

@Component({
  selector: 'co-app-closed-votes-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzTypographyModule,
    TranslateModule,
    VoteResultModalComponent,
  ],
  templateUrl: './closed-votes-table.component.html',
  styleUrl: './closed-votes-table.component.scss',
})
export class ClosedVotesTableComponent {
  @Input() votes: Vote[] | null | undefined;
}
