import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vote } from '@prisma/client';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslateModule } from '@ngx-translate/core';
import { VotePreviewModalComponent } from '../vote-preview-modal/vote-preview-modal.component';

@Component({
  selector: 'co-app-upcoming-votes-table',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzTypographyModule,
    TranslateModule,
    VotePreviewModalComponent,
  ],
  templateUrl: './upcoming-votes-table.component.html',
  styleUrl: './upcoming-votes-table.component.scss',
})
export class UpcomingVotesTableComponent {
  @Input() votes: Vote[] | null | undefined;
}
