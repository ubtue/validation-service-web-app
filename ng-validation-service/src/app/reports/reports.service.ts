import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BatchReportsPage } from '../shared/model/batch-reports.model';
import { QueuePage } from '../shared/model/queue-order.model';
import { FileReportsPage } from '../shared/model/file-reports.model';
import { BatchReport } from '../shared/model/batch-report.model';


@Injectable()
export class ReportsService {

  batchReportsResourceUrl: string = environment.apiBaseUrl + '/batch-reports';
  fileReportsResourceUrl: string = environment.apiBaseUrl + '/file-reports';
  queueResourceUrl: string = environment.apiBaseUrl + '/queue';


  constructor(private httpClient: HttpClient) { }

  getReportsStartPage() {
    return this.getReportsPage(this.batchReportsResourceUrl);
  }

  getReportsPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if(descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }

    return this.httpClient.get<BatchReportsPage>(url, {params: params}) ;
  }

  getBatchReportById(id: number) {
    return this.httpClient.get<BatchReport>(this.batchReportsResourceUrl + '/' + id);
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

  getFileReportsForBatchReportId(batchRepId: number) {
    return this.httpClient.get<FileReportsPage>(this.fileReportsResourceUrl + '?batchReportId=' + batchRepId);
  }

  getFileReportsPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if (descriptionFilter.length > 0) {
        params = params.append('descriptionFilter', descriptionFilter );
    }
    return this.httpClient.get<FileReportsPage>(url, {params: params}) ;
  }


}
