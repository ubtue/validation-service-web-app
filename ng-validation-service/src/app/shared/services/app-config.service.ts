import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class AppConfigService {
  private appConfig;

  constructor(private http: HttpClient) { }



  loadAppConfig() {
    let settingsUrl = environment.production ? '/validationservice/assets/settings.json' : '/assets/settings.json';

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
