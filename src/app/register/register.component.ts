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
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private _location = inject(Location);
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
    // this.authService.isRegistering = false;
    this.authService.isErrorOnLogin.set(false);
    this.authService.errorMessage.set('');
  }

  onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.onRegister(this.loginForm.value);
  }

  onRegister(data: any): void {
    if (this.loginForm.value.password !== this.loginForm.value.repeatPassword) {
      this.authService.errorMessage.set('Passwords do not match');
      return;
    }
    this.authService.onRegister(data).subscribe({
      next: (res) => {
        this.authService.isLogged.set(true);
        this.authService.isRegistering = false;
        localStorage.setItem('token', res.accessToken);
        this.authService.errorMessage.set('');
      },
      error: (err) => {
        this.authService.isErrorOnLogin.set(true);
        this.authService.errorMessage.set(err.error);
        console.log(err);
      },
    });
  }
}
