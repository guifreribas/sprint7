import { Injectable, OnInit, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public currentUrl = signal<string>('');

  constructor(router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.currentUrl.set(event.url);
      }
    });
  }
}
