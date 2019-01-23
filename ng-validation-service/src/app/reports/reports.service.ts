import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BatchReportsPage } from '../shared/model/batch-reports.model';
import { QueuePage } from '../shared/model/queue-order.model';


@Injectable()
export class ReportsService {

  reportsResourceUrl: string = environment.apiBaseUrl + '/batch-reports';
  queueResourceUrl: string = environment.apiBaseUrl + '/queue';


  constructor(private httpClient: HttpClient) { }

  getReportsStartPage() {
    return this.getReportsPage(this.reportsResourceUrl);
  }

  getReportsPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if(descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }

    return this.httpClient.get<BatchReportsPage>(url, {params: params}) ;
  }

  getQueueStartPage() {
    return this.getQueuePage(this.queueResourceUrl);
  }

  getQueuePage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if (descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }
    return this.httpClient.get<QueuePage>(url, {params: params}) ;
  }


}
