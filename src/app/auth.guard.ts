import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/*export const authGuard: CanActivateFn = (route, state) => {
  if(this.authService.isLoggedIn) {
    return true;
  }

  this.router.navigate(['/login']);
  return false;
};*/

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const  authService  =  inject(AuthService);
  

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;


/*const user = localStorage.getItem('user');

if (user!=null) {
  const test = JSON.parse(user);

  const firstname = test.firstname;
  const lastname = test.lastname;
  if (firstname != null && lastname!=null) {
    return true;
  } else { 
    router.navigateByUrl('/login');
    return false;
  }
} else {
  return false;
}*/
};