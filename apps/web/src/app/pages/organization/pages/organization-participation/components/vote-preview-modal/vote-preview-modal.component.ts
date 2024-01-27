import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Vote, VoteOption } from '@prisma/client';
import { VoteOptionsService } from '@co-app/votes/vote-options/frontend';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'co-app-vote-preview-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzCheckboxModule,
    NzModalModule,
    NzTypographyModule,
    TranslateModule,
  ],
  templateUrl: './vote-preview-modal.component.html',
  styleUrl: './vote-preview-modal.component.scss',
})
export class VotePreviewModalComponent {
  private readonly voteSubject = new BehaviorSubject<Vote | null>(null);
  readonly vote$ = this.voteSubject.asObservable();

  readonly voteOptions$: Observable<VoteOption[]> = this.vote$.pipe(
    switchMap((vote) =>
      vote
        ? this.voteOptionsService.findAll({
            where: { voteId: vote.id },
          })
        : of()
    )
  );

  visible = false;

  constructor(private readonly voteOptionsService: VoteOptionsService) {}

  open(vote: Vote) {
    this.visible = true;
    this.setVote(vote);
  }

  close() {
    this.visible = false;
  }

  afterClose() {
    this.resetVote();
  }

  async setVote(vote: Vote) {
    this.voteSubject.next(vote);
  }

  resetVote() {
    this.voteSubject.next(null);
  }
}
