import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: HttpClient, useValue: spy }],
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(AuthService);
  });

  it('should return 404 status on login', (done: DoneFn) => {
    const errorLoginData = {
      email: 'test@mail.com',
      password: '12345',
    };
    const errorResponse = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      url: 'http://localhost:3000/login',
      error: 'Incorrect password',
    });
    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));

    service.onLogin(errorLoginData).subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        expect(err.status).toBe(400);
        done();
      },
    });
  });

  it('should return 200 status on login', (done: DoneFn) => {
    const loginData = {
      email: 'test@mail.com',
      password: '1234567',
    };
    const response = new HttpErrorResponse({
      status: 200,
      url: 'http://localhost:3000/login',
    });
    httpClientSpy.post.and.returnValue(of(response));

    service.onLogin(loginData).subscribe({
      next: (res) => {
        expect(res.status).toBe(200);
        done();
      },
      error: (err) => {
        console.log(err);
      },
    });
  });
});
