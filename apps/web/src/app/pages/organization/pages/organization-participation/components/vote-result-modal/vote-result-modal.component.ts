import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Vote, VoteOption } from '@prisma/client';
import { AuthService } from '@co-app/auth/frontend';
import { VoteBallotsService } from '@co-app/votes/vote-ballots/frontend';
import { VoteOptionsService } from '@co-app/votes/vote-options/frontend';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'co-app-vote-result-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzDividerModule,
    NzGridModule,
    NzModalModule,
    NzProgressModule,
    NzTypographyModule,
    TranslateModule,
  ],
  templateUrl: './vote-result-modal.component.html',
  styleUrl: './vote-result-modal.component.scss',
})
export class VoteResultModalComponent {
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
  readonly voteResults$ = combineLatest({
    vote: this.vote$,
    voteOptions: this.voteOptions$,
  }).pipe(
    switchMap(({ vote, voteOptions }) =>
      vote
        ? this.voteBallotsService.findAll({ where: { voteId: vote.id } }).pipe(
            map((voteBallots) =>
              voteOptions.map((voteOption) => {
                const voteOptionBallots = voteBallots.filter(
                  ({ voteOptionId }) => voteOptionId === voteOption.id
                );
                const absoluteBallots = voteOptionBallots.length;
                const relativeBallots =
                  absoluteBallots / voteBallots.length || 0;
                return { ...voteOption, absoluteBallots, relativeBallots };
              })
            )
          )
        : of()
    )
  );

  readonly userBallot$ = combineLatest({
    auth: this.authService.auth$,
    vote: this.vote$,
  }).pipe(
    switchMap(({ auth, vote }) =>
      auth && vote
        ? this.voteBallotsService.findByUserIdAndVoteId(auth.user.id, vote.id)
        : of()
    )
  );

  visible = false;

  constructor(
    private readonly authService: AuthService,
    private readonly voteBallotsService: VoteBallotsService,
    private readonly voteOptionsService: VoteOptionsService
  ) {}

  resultFormatFn = (voteResult: {
    absoluteBallots: number;
    relativeBallots: number;
  }) => {
    return () =>
      `${voteResult.relativeBallots}% (${voteResult.absoluteBallots})`;
  };

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
