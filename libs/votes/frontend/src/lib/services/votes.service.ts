import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@co-app-env';
import { Vote, Prisma, VoteOption } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VotesService {
  private readonly resource = 'votes';

  private get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  constructor(private readonly httpClient: HttpClient) {}

  findAll(args?: Prisma.VoteFindManyArgs) {
    let params = new HttpParams();

    if (args) {
      params = params.set('args', JSON.stringify(args));
    }

    return this.httpClient.get<Vote[]>(`${this.url}`, { params });
  }

  create(
    data: Pick<
      Vote,
      'name' | 'description' | 'startsAt' | 'endsAt' | 'organizationId'
    > & { voteOptions: Pick<VoteOption, 'name'>[] }
  ) {
    return firstValueFrom(this.httpClient.post<Vote>(`${this.url}`, data));
  }
}
