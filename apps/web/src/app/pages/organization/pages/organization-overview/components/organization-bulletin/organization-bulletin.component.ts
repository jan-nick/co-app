import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'co-app-organization-bulletin',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, TranslateModule],
  templateUrl: './organization-bulletin.component.html',
  styleUrl: './organization-bulletin.component.scss',
})
export class OrganizationBulletinComponent {
  @Input() isEditing = false;

  @Input() bulletin = '';
  @Output() bulletinChange = new EventEmitter<string>();
}
