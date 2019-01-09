import { Link } from '../shared/model/common-interfaces.model';
import { Batch } from '../shared/model/batch.model';
import { ConfigurationsPage } from '../shared/model/configurations.model';
import { Configuration } from '../shared/model/configuration.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Util } from '../shared/util';
import { File } from '../shared/model/file.model';

@Injectable()
export class ConfigurationsService {

  configurationsResourceUrl: string = environment.apiBaseUrl + '/configurations';

  constructor(private httpClient: HttpClient) { }

  getConfigurationsPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if(descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }

    return this.httpClient.get<ConfigurationsPage>(url, {params: params}) ;
  }

  getConfigurationsStartPage() {
    return this.getConfigurationsPage(this.configurationsResourceUrl);
  }

  getConfigurationById(id: number) {
    return this.httpClient.get<Configuration>(this.configurationsResourceUrl + '/' + id);
  }

  getConfigurationFromUrl(url: string) {
    return this.httpClient.get<Configuration>(url);
  }

  createNewConfiguration(configuration: Configuration) {
    return this.httpClient.post<Configuration>(this.configurationsResourceUrl, configuration);
  }

  putConfiguration(configuration: Configuration) {
    return this.httpClient.put<Configuration>(Util.getHrefForRel(configuration, 'self'), configuration);
  }

  deleteConfiguration(configuration: Configuration) {
    return this.httpClient.delete(Util.getHrefForRel(configuration,'self'));
  }

  refetchConfigurationsPage(page: ConfigurationsPage) {
    return this.httpClient.get<ConfigurationsPage>(Util.getHrefForRel(page,'self'));
  }




}
