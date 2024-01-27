import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vote } from '@prisma/client';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslateModule } from '@ngx-translate/core';
import { CastBallotModalComponent } from '../cast-ballot-modal/cast-ballot-modal.component';

@Component({
  selector: 'co-app-ongoing-votes-table',
  standalone: true,
  imports: [
    CastBallotModalComponent,
    CommonModule,
    NzTableModule,
    NzTypographyModule,
    TranslateModule,
  ],
  templateUrl: './ongoing-votes-table.component.html',
  styleUrl: './ongoing-votes-table.component.scss',
})
export class OngoingVotesTableComponent {
  @Input() votes: Vote[] | null | undefined;
}
