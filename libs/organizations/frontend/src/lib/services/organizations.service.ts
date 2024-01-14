import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@co-app-env';
import { Organization, Prisma } from '@prisma/client';

@Injectable({ providedIn: 'root' })
export class OrganizationsService {
  private readonly resource = 'organizations';

  private get url() {
    return `${environment.backendUrl}/${this.resource}`;
  }

  constructor(private readonly httpClient: HttpClient) {}

  findOne(id: string) {
    return this.httpClient.get<Organization>(`${this.url}/${id}`);
  }

  findAll(args?: Prisma.OrganizationFindManyArgs) {
    let params = new HttpParams();

    if (args) {
      params = params.set('args', JSON.stringify(args));
    }

    return this.httpClient.get<Organization[]>(`${this.url}`, { params });
  }
}
