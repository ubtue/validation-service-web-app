import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
