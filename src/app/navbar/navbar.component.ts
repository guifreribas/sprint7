import { Component, OnInit, inject } from '@angular/core';
import { StarshipsService } from '../service/starships.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  public readonly navbarService = inject(NavbarService);
  public authService = inject(AuthService);
  public loginResponse: ResponseHandle = { success: null, error: null };
  public registerResponse: ResponseHandle = { success: null, error: null };
  // public isLoggingIn: boolean = false;
  // public isRegistering: boolean = false;

  ngOnInit(): void {
    localStorage.getItem('token');
    if (localStorage.getItem('token')) {
      this.authService.isLogged.set(true);
    }
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
  }

  // onRegister(): void {
  //   this.authService
  //     .onRegister({
  //       email: 'test@mail.com',
  //       password: '123456',
  //     })
  //     .subscribe({
  //       next: (res) => {
  //         this.registerResponse.success = res;
  //         this.authService.isLogged.set(true);
  //       },
  //       error: (err) => (this.registerResponse.error = err),
  //     });
  // }

  // onLogin(): void {
  //   this.authService
  //     .onLogin({ email: 'test@mail.com', password: '123456' })
  //     .subscribe({
  //       next: (res) => {
  //         this.loginResponse.success = res;
  //         this.authService.isLogged.set(true);
  //       },
  //       error: (err) => (this.loginResponse.error = err),
  //     });
  // }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
