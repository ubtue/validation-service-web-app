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
import { FitsResultRulesPage } from '../shared/model/fits-result-rules.model';
import { FitsResultRule } from '../shared/model/fits.result-rule.model';
import { VerapdfSetup } from '../shared/model/verapdf-setup.model';

@Injectable()
export class ConfigurationsService {

  configurationsResourceUrl: string = environment.apiBaseUrl + '/configurations';
  fileNameRulesResourceUrl: string = environment.apiBaseUrl + '/file-name-rules';
  fitsResultRulesResourceUrl: string = environment.apiBaseUrl + '/fits-result-rules';

  constructor(private httpClient: HttpClient) { }

  listItemDeleted: Subject<void> = new Subject<void>();
  // configUpdated: Subject<void> = new Subject<void>();
  configLoaded: Subject<Configuration> = new Subject<Configuration>();
  fileNameRulesUpdated: Subject<void> = new Subject<void>();
  fitsResultRulesUpdated: Subject<void> = new Subject<void>();

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

  // FileNameRules

  getFileNameRulesPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if(descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }
    return this.httpClient.get<FileNameRulesPage>(url, {params: params}) ;
  }

  refetchFileNameRulesPage(page: FileNameRulesPage) {
    return this.httpClient.get<FileNameRulesPage>(Util.getHrefForRel(page,'self'));
  }

  getFileNameRuleById(id: number) {
    return this.httpClient.get<FileNameRule>(this.fileNameRulesResourceUrl + '/' + id);
  }

  updateFileNameRule(rule: FileNameRule) {
    return this.httpClient.put<void>(Util.getHrefForRel(rule, 'self'), rule);
  }

  createFileNameRule(rule: FileNameRule, config: Configuration) {
    return this.httpClient.post<FileNameRule>(Util.getHrefForRel(config, 'file-name-rules'), rule);
  }

  deleteFileNameRule(rule: FileNameRule) {
    return this.httpClient.delete(Util.getHrefForRel(rule, 'self'));
  }

  //FitsResultRules

  getFitsResultRulesPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if(descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }
    return this.httpClient.get<FitsResultRulesPage>(url, {params: params}) ;
  }

  refetchFitsResultRulesPage(page: FitsResultRulesPage) {
    return this.httpClient.get<FitsResultRulesPage>(Util.getHrefForRel(page,'self'));
  }

  getFitsResultRuleById(id: number) {
    console.log('getting to: ' + this.fitsResultRulesResourceUrl + '/' + id);
    return this.httpClient.get<FitsResultRule>(this.fitsResultRulesResourceUrl + '/' + id);
  }

  createFitsResultRule(rule: FitsResultRule, config: Configuration) {
    return this.httpClient.post<FitsResultRule>(Util.getHrefForRel(config, 'fits-result-rules'), rule);
  }

  updateFitsResultRule(rule: FitsResultRule) {
    return this.httpClient.put<void>(Util.getHrefForRel(rule, 'self'), rule);
  }

  deleteFitsResultRule(rule: FitsResultRule) {
    return this.httpClient.delete(Util.getHrefForRel(rule, 'self'));
  }

  updateVerapdfSetup(verapdfSetup: VerapdfSetup) {
    console.log(verapdfSetup);
    return this.httpClient.put<void>(Util.getHrefForRel(verapdfSetup, 'self'), verapdfSetup);
  }







}
