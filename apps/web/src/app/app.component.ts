import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '@co-app-env';

@Component({
  selector: 'co-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web';

  constructor(private readonly httpClient: HttpClient) {}

  getData() {
    return this.httpClient.get(environment.backendUrl).subscribe();
  }
}
