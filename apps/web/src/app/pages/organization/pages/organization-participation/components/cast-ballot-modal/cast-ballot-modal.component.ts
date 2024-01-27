import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
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
  firstValueFrom,
  of,
  switchMap,
} from 'rxjs';
import { VotesStoreService } from '../../services/votes-store.service';

@Component({
  selector: 'co-app-cast-ballot-modal',
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
  templateUrl: './cast-ballot-modal.component.html',
  styleUrl: './cast-ballot-modal.component.scss',
})
export class CastBallotModalComponent {
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

  selectedVoteOptionId: VoteOption['voteId'] | null | undefined;

  visible = false;

  constructor(
    private readonly authService: AuthService,
    private readonly voteBallotsService: VoteBallotsService,
    private readonly voteOptionsService: VoteOptionsService,
    private readonly votesStoreService: VotesStoreService
  ) {}

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
    this.selectedVoteOptionId = null;
  }

  selectVoteOption(voteOption: VoteOption) {
    this.selectedVoteOptionId = voteOption.id;
  }

  async save() {
    const auth = await firstValueFrom(this.authService.auth$);
    const vote = await firstValueFrom(this.vote$);

    if (!auth?.user || !vote || !this.selectedVoteOptionId) return;

    await this.voteBallotsService.create({
      userId: auth.user.id,
      voteId: vote.id,
      voteOptionId: this.selectedVoteOptionId,
    });

    this.votesStoreService.triggerRefresh();

    this.close();
  }
}
