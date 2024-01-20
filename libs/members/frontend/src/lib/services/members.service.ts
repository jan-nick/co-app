import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@co-app-env';
import { Member, Organization, Prisma, User } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MembersService {
  private readonly resource = 'members';

  private get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  constructor(private readonly httpClient: HttpClient) {}

  findAll(args?: Prisma.MemberFindManyArgs) {
    let params = new HttpParams();

    if (args) {
      params = params.set('args', JSON.stringify(args));
    }

    return this.httpClient.get<Member[]>(`${this.url}`, { params });
  }

  create(data: { email: User['email']; organizationId: Organization['id'] }) {
    return firstValueFrom(this.httpClient.post<Member>(`${this.url}`, data));
  }
}
