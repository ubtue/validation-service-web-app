import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, mapTo, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthenticationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private activeLogin: string;
  private readonly loginUrl = this.configService.getConfig()['apiBaseUrl'] + '/users/login';

  constructor(private http: HttpClient, private configService: AppConfigService, private tokenHelperService: JwtHelperService) {}

  login(user: { userName: string, password: string }): Observable<boolean> {
    return this.http.post(this.loginUrl, {login: user.userName, password: user.password}, { responseType: 'text' })
    .pipe(
      map(
        (token) => {
          this.storeJwtToken(token);
          return true;
        },
        (error) => {
          this.removeToken();
          return false;
        }
      )
    );
  }

  logout() {
    this.removeToken();
  }

  isAuthenticated() {
    const token = this.getJwtToken();
    if (token) {
      return !this.tokenHelperService.isTokenExpired(token);
    } else {
      return false;
    }
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }



  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}



}
