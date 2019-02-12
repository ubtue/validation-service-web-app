import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationSettings } from '../shared/model/settings.model';

@Injectable()
export class SettingsService {

  settingsResourceUrl: string = environment.apiBaseUrl + '/setup';

  constructor(private httpClient: HttpClient) { }

  getSettings() {
    return this.httpClient.get<ApplicationSettings>(this.settingsResourceUrl);
  }

  updateSettings(settings: ApplicationSettings) {
    return this.httpClient.put<void>(this.settingsResourceUrl, settings);
  }

}
