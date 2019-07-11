import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, mapTo, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private activeLogin: string;
  private readonly loginUrl = this.configService.getConfig()['apiBaseUrl'] + '/users/login';

  constructor(private http: HttpClient,
    private configService: AppConfigService,
    private tokenHelperService: JwtHelperService,
    private errorService: ErrorService,
    private router: Router) {}

  login(userName: string, password: string): Observable<boolean> {
    const payload = new HttpParams()
    .set('login', userName)
    .set('password', password);

    return this.http.post<any>(this.loginUrl, payload, {observe: 'response' })
    .pipe(
      map(
        (response) => {
          this.storeJwtToken(response.headers.get('Authorization'));
          return true;
        },
        (error) => {
          console.log(error);
          this.removeToken();
          return false;
        }
      ),
      catchError((error) => {
        this.errorService.raiseGlobalErrorMessage('Authentication failed', error);
        return of(false);
      })
    );
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    const token = this.getJwtToken();
    if (token && !this.tokenHelperService.isTokenExpired(token)){
      return true;
    }

    return false;
  }

  isInRoleAdmin() {
    if(!this.isAuthenticated()) {
      return false;
    }

    const decodedToken = this.tokenHelperService.decodeToken(this.getJwtToken());
    const role = decodedToken['role'];
    return role === 'ADMIN';
  }

  getJwtToken() {
    const token = localStorage.getItem(this.JWT_TOKEN);

    if(token && !this.activeLogin) {
      this.setActiveLogin(token);
    }

    return token;
  }

  getActiveUser() {
    return this.activeLogin;
  }



  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    this.setActiveLogin(jwt);
  }

  private setActiveLogin(token: string) {
    const decodedToken = this.tokenHelperService.decodeToken(token);
    const user = decodedToken['sub'];
    const role = decodedToken['role'];
    // this.activeLogin = `${user} (${role})`;
    this.activeLogin = `${user}`;
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.activeLogin = null;
  }





}
