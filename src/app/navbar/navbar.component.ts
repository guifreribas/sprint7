import { Component, OnInit, inject } from '@angular/core';
import { StarshipsService } from '../service/starships.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../service/navbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly starshipsService = inject(StarshipsService);
  public readonly navbarService = inject(NavbarService);

  constructor() {
    console.log(this.navbarService.currentUrl());
  }

  ngOnInit(): void {
    console.log(this.navbarService.currentUrl());
    console.log('init');
  }

  onSelectStarship(starship: any): void {
    console.log('click!');
    this.starshipsService.onSelectStarship(starship);
  }
}
