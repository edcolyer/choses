import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  public pageTitle = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.pageTitle = this.getPageTitle(currentRoute);
      }
    });
  }

  public isLinkActive(route: string): boolean {
    return this.router.url === route;
  }

  private getPageTitle(route: string): string {
    switch (route) {
      case '/today':
        return 'Today';
      case '/upcoming':
        return 'Upcoming';
      case '/completed':
        return 'Completed';
      default:
        return '';
    }
  }
}
