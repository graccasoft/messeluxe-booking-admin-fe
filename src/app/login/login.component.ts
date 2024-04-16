import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { LoginForm } from './login.form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { UserToken } from '../model/user-token';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginForm]
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    public form: LoginForm,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ){}

  submit() {
    if (!this.form.form.valid) {
      return;
    }

    this.loginService.signIn(this.form.value)
      .pipe(
        catchError(err => {
          this.snackBar.open( err?.error?.message ?? 'Could not log you in' );
          return throwError(err)
        }),
      )
      .subscribe(async (user: UserToken) => {
        await this.authService.authenticate(user)
        await this.router.navigateByUrl('/admin');
      });
  }

}
