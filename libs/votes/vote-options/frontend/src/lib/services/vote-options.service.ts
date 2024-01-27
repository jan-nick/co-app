import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@co-app-env';
import { Prisma, VoteOption } from '@prisma/client';

@Injectable({ providedIn: 'root' })
export class VoteOptionsService {
  private readonly resource = 'vote-options';

  private get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  constructor(private readonly httpClient: HttpClient) {}

  findAll(args?: Prisma.VoteOptionFindManyArgs) {
    let params = new HttpParams();

    if (args) {
      params = params.set('args', JSON.stringify(args));
    }

    return this.httpClient.get<VoteOption[]>(`${this.url}`, { params });
  }
}
