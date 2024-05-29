import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../service/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _location = inject(Location);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public authService = inject(AuthService);
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onClose(): void {
    // this.authService.isLoggingIn = false;
    this.authService.isErrorOnLogin.set(false);
    this._location.back();
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.onLogin(this.loginForm.value);
  }

  onLogin(data: any): void {
    this.authService.onLogin(data).subscribe({
      next: (res) => {
        this.authService.isLogged.set(true);
        this.authService.isLoggingIn = false;
        localStorage.setItem('token', res.accessToken);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        this.authService.isErrorOnLogin.set(true);
        console.log(err);
      },
    });
  }
}
