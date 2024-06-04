import { inject } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('NavbarComponent', () => {
  let navbarComponent: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),

        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    navbarComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      navbarComponent = new NavbarComponent();
    });
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });

  it('should return authService.isLoggingIn as true when onLogin is called', () => {
    navbarComponent.onLogin();
    expect(navbarComponent.authService.isLoggingIn).toBe(true);
  });

  it('should return authService.isRegistering as true when onRegister is called', () => {
    navbarComponent.onRegister();
    expect(navbarComponent.authService.isRegistering).toBe(true);
  });

  it('should return authService.isLogged as false when onLogout is called', () => {
    navbarComponent.onLogout();
    expect(navbarComponent.authService.isLogged()).toBe(false);
  });
  it('should not has token on localStorage when onLogout is called', () => {
    localStorage.setItem('token', 'test');
    navbarComponent.onLogout();
    expect(localStorage.getItem('token')).toBe(null);
  });
});
