import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Security } from '../util/security.util';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = Security.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
