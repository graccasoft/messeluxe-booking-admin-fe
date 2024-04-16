import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../model/login-credentials';
import { UserToken } from '../model/user-token';
import { AuthService } from './auth.service';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiBaseUrl = '/api/auth'
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  signIn(credentials: LoginCredentials) {
    return this.httpClient.post<UserToken>(`${this.apiBaseUrl}/login`, credentials)
      .pipe(
        tap(async (user: UserToken) => {
          await this.authService.authenticate(user)
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }
}
