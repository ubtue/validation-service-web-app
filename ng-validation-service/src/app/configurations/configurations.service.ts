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
import { FileNameRulesPage } from '../shared/model/file-name-rules.model';
import { FileNameRule } from '../shared/model/file-name-rule.model';

@Injectable()
export class ConfigurationsService {

  configurationsResourceUrl: string = environment.apiBaseUrl + '/configurations';
  fileNameRulesResourceUrl: string = environment.apiBaseUrl + '/file-name-rules';

  constructor(private httpClient: HttpClient) { }

  configUpdated: Subject<void> = new Subject<void>();

  // ConfigurationPage
  
  getConfigurationsStartPage() {
    return this.getConfigurationsPage(this.configurationsResourceUrl);
  }

  getConfigurationsPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if(descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }

    return this.httpClient.get<ConfigurationsPage>(url, {params: params}) ;
  }

  refetchConfigurationsPage(page: ConfigurationsPage) {
    return this.httpClient.get<ConfigurationsPage>(Util.getHrefForRel(page,'self'));
  }

  // Configuration

  getConfigurationById(id: number) {
    return this.httpClient.get<Configuration>(this.configurationsResourceUrl + '/' + id);
  }

  getConfigurationFromUrl(url: string) {
    return this.httpClient.get<Configuration>(url);
  }

  createNewConfiguration() {
    return this.httpClient.post<Configuration>(this.configurationsResourceUrl, '');
  }

  updateConfiguration(configuration: Configuration) {
    console.log('putting to: ' +  Util.getHrefForRel(configuration, 'self'))
    return this.httpClient.put<Configuration>(Util.getHrefForRel(configuration, 'self'), configuration);
  }

  deleteConfiguration(configuration: Configuration) {
    return this.httpClient.delete(Util.getHrefForRel(configuration,'self'));
  }

  // FileNameRulesPage

  getFileNameRulesPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if(descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }
    return this.httpClient.get<FileNameRulesPage>(url, {params: params}) ;
  }

  getFileNameRuleById(id: number) {
    return this.httpClient.get<FileNameRule>(this.fileNameRulesResourceUrl + '/' + id);
  }



}
