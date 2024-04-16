import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  let authenticated = inject(AuthService).isAuthenticated();
  if(!authenticated){
    let router = inject(Router)
    router.navigateByUrl('/login')
  }
  return authenticated;
};
