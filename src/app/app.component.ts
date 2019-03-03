import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <div class="home-section">
      <h1>{{title}}</h1>
      <nav>
        <a routerLink="/employees" routerLinkActive="active">Employees</a>
        <a routerLink="/submitted-employees" routerLinkActive="active">Submitted Employees</a>
      </nav>
    </div>
  </div>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'List of Employees';
}