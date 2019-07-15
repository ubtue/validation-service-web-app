import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let role = route.data['role'] as string;

    if (! this.authService.isAuthenticated() || ! this.isInRequiredRole(role)) {  
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isInRequiredRole(role: string) {
    if(role === 'admin' &&  !this.authService.isInRoleAdmin()) {
      return false;
    }
    return true;
  }
}
