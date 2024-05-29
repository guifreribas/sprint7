import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  public isLogged = signal(false);
  public isErrorOnLogin = signal<boolean>(false);
  public isLoggingIn: boolean = false;
  public isRegistering: boolean = false;
  public errorMessage = signal<string>('');

  constructor() {}

  onRegister(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/users', data).pipe(
      tap({
        next: () => this.isLogged.set(true),
        error: (err) => this.errorMessage.set(err.error),
      })
    );
  }

  onLogin(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/login', data).pipe(
      tap({
        next: () => this.isLogged.set(true),
        error: () => this.isLogged.set(false),
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isLogged();
  }

  onLogout(): void {
    this.isLogged.set(false);
  }
}
