import { Routes } from '@angular/router';
import { StarshipsComponent } from './starships/starships.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'starships',
    component: StarshipsComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },
];
