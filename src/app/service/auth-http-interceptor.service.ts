import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, switchMap, throwError } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fromPromise(
      this.createAuthEvent(request)).pipe(switchMap((v) => next.handle(v).pipe(
        map(res => {
          return res
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Client side Error: ${error.error.message}`;
          } else {
            errorMsg = `API Error Code: ${error.status},  Message: ${error.message}`;

            //security error, redirect to login page
            if (!request.url.includes("auth/")) {
              if (error.status == 403 || error.status == 401) {
                this.router.navigateByUrl('/login');
              }
            }
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      ))
      );
  }

  async createAuthEvent(request: HttpRequest<any>) {
    const user = this.authService.user?.value;
    const token = this.authService.user?.value?.token;
    const userId = user?.user.id;
    if (!userId) {
      return request;
    }

    let addBearerToken = true;
    if (request.url.includes("auth/")) {
      addBearerToken = false;
    }

    if (addBearerToken) {

      return request.clone({
        setHeaders: {
          userId: `${userId}`,
          Authorization: `Bearer ${token}`
        },
      });

    }
    return request;


  }
}

