import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@co-app-env';
import { Prisma, VoteBallot } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoteBallotsService {
  private readonly resource = 'vote-ballots';

  private get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  constructor(private readonly httpClient: HttpClient) {}

  findAll(args?: Prisma.VoteBallotFindManyArgs) {
    let params = new HttpParams();

    if (args) {
      params = params.set('args', JSON.stringify(args));
    }

    return this.httpClient.get<VoteBallot[]>(`${this.url}`, { params });
  }

  findByUserIdAndVoteId(userId: string, voteId: string) {
    return this.httpClient.get<VoteBallot>(`${this.url}/${userId}/${voteId}`);
  }

  create(data: Pick<VoteBallot, 'userId' | 'voteId' | 'voteOptionId'>) {
    return firstValueFrom(
      this.httpClient.post<VoteBallot>(`${this.url}`, data)
    );
  }
}
