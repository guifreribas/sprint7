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
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private _location = inject(Location);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  public authService = inject(AuthService);
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
  });

  onClose(): void {
    this._location.back();
    this.authService.isErrorOnLogin.set(false);
    this.authService.errorMessage.set('');
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.onRegister(this.loginForm.value);
  }

  onRegister(data: any): void {
    if (this.loginForm.controls['email'].invalid) {
      this.authService.errorMessage.set('Invalid email');
      return;
    }
    if (this.loginForm.controls['password'].invalid) {
      this.authService.errorMessage.set('Password is required');
      return;
    }
    if (data.password !== data.repeatPassword) {
      this.authService.errorMessage.set('Passwords do not match');
      return;
    }
    const dataToRegister = {
      email: data.email,
      password: data.password,
    };
    this.authService.onRegister(dataToRegister).subscribe({
      next: (res) => {
        this.authService.isLogged.set(true);
        this.authService.isRegistering = false;
        localStorage.setItem('token', res.accessToken);
        this.authService.errorMessage.set('');
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        this.authService.isErrorOnLogin.set(true);
        this.authService.errorMessage.set(err.error);
        console.log(err);
      },
    });
  }
}
