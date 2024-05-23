import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LogoSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'co-app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  @Input() size: LogoSize = 'medium';
  @Input() textVisible = false;
}
