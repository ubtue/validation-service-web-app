import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class AppConfigService {
  private appConfig;
  private http: HttpClient;
  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
 }


  loadAppConfig() {
    let settingsUrl = './assets/settings.json';

    return this.http.get(settingsUrl)
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }



  getConfig() {
    return this.appConfig;
  }
}
