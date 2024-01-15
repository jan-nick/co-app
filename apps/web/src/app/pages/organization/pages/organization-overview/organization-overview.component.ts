import { Component, OnInit } from '@angular/core';
import { OrganizationStoreService } from '../../services/organization-store.service';

@Component({
  selector: 'co-app-organization-overview',
  templateUrl: './organization-overview.component.html',
  styleUrl: './organization-overview.component.scss',
})
export class OrganizationOverviewComponent implements OnInit {
  readonly organization$ = this.organizationStoreService.organization$;

  bulletin = '';

  isEditing = false;

  constructor(
    private readonly organizationStoreService: OrganizationStoreService
  ) {}

  ngOnInit(): void {
    this.organization$.subscribe((organization) => {
      this.bulletin = organization.bulletin || '';
    });
  }

  edit() {
    this.isEditing = true;
  }

  cancel() {
    this.isEditing = false;
  }

  async save() {
    await this.organizationStoreService.update({ bulletin: this.bulletin });

    this.isEditing = false;
  }
}
