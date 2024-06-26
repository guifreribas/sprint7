import { Component, OnInit, inject } from '@angular/core';
import { StarshipsService } from '../service/starships.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarService } from '../service/navbar.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { ResponseHandle } from '../models/interfaces';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly starshipsService = inject(StarshipsService);
  private readonly router = inject(Router);
  public readonly navbarService = inject(NavbarService);
  public authService = inject(AuthService);
  public loginResponse: ResponseHandle = { success: null, error: null };
  public registerResponse: ResponseHandle = { success: null, error: null };
  public menuOpen = false;

  ngOnInit(): void {
    localStorage.getItem('token');
    if (localStorage.getItem('token')) {
      this.authService.isLogged.set(true);
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onSelectStarship(starship: any): void {
    this.starshipsService.onSelectStarship(starship);
  }
  onLogin(): void {
    this.authService.isLoggingIn = true;
  }
  onRegister(): void {
    this.authService.isRegistering = true;
  }
  onLogout(): void {
    this.authService.isLogged.set(false);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
