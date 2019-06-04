import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationSettings } from '../shared/model/settings.model';
import { AppConfigService } from '../shared/services/app-config.service';

@Injectable()
export class SettingsService {

  settingsResourceUrl: string = this.configService.getConfig()['apiBaseUrl'] + '/setup';

  constructor(private httpClient: HttpClient,  private configService: AppConfigService) { }

  getSettings() {
    return this.httpClient.get<ApplicationSettings>(this.settingsResourceUrl);
  }

  updateSettings(settings: ApplicationSettings) {
    return this.httpClient.put<void>(this.settingsResourceUrl, settings);
  }

}
