import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, mapTo, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private activeLogin: string;
  private readonly loginUrl = this.configService.getConfig()['apiBaseUrl'] + '/users/login';

  constructor(private http: HttpClient, private configService: AppConfigService, private tokenHelperService: JwtHelperService) {}

  login(userName: string, password: string): Observable<boolean> {
    const payload = new HttpParams()
    .set('login', userName)
    .set('password', password);

    return this.http.post<any>(this.loginUrl, payload, {observe: 'response' })
    .pipe(
      map(
        (response) => {
          this.storeJwtToken(response.headers.get('Authorization'));
          console.log('ok?:' + this.isAuthenticated());
          return true;
        },
        (error) => {
          console.log(error);
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
    console.log(this.getJwtToken());
    const token = this.getJwtToken();
    if (token && !this.tokenHelperService.isTokenExpired(token)){
      return true;
    }


    return false;

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
