import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { OrganizationStoreService } from './services/organization-store.service';

@Component({
  selector: 'co-app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject<boolean>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly organizationStoreService: OrganizationStoreService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map(({ id }) => id),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      )
      .subscribe((id) => {
        this.organizationStoreService.init(id);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
