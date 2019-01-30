import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BatchReportsPage } from '../shared/model/batch-reports.model';
import { QueuePage, Order } from '../shared/model/queue-order.model';
import { FileReportsPage } from '../shared/model/file-reports.model';
import { BatchReport } from '../shared/model/batch-report.model';
import { ChecksPage } from '../shared/model/checks.model';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FileReport } from '../shared/model/file-report.model';
import { Util } from '../shared/util';


@Injectable()
export class ReportsService {

  batchReportsResourceUrl: string = environment.apiBaseUrl + '/batch-reports';
  fileReportsResourceUrl: string = environment.apiBaseUrl + '/file-reports';
  queueResourceUrl: string = environment.apiBaseUrl + '/queue';

  lastFetchedFileReportsPage: FileReportsPage;
  lastFetchedBatchReportsPage: BatchReportsPage;


  constructor(private httpClient: HttpClient) { }

  getReportsStartPage() {
    return this.getReportsPage(this.batchReportsResourceUrl).pipe(
      tap((page: BatchReportsPage) => {
        this.lastFetchedBatchReportsPage = page;
      })
    );
  }

  getReportsPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if (descriptionFilter.length > 0) {
      params = params.append('descriptionFilter', descriptionFilter);
    }

    return this.httpClient.get<BatchReportsPage>(url, { params: params }).pipe(
      tap((page: BatchReportsPage) => {
        this.lastFetchedBatchReportsPage = page;
      })
    );
  }

  getBatchReportById(id: number) {
    if (this.lastFetchedBatchReportsPage) {
      for (let report of this.lastFetchedBatchReportsPage._embedded['batch-reports']) {
        if (report.id === id) {
          return of(report);
        }
      }
    }
    return this.httpClient.get<BatchReport>(this.batchReportsResourceUrl + '/' + id);
  }

  getQueueStartPage() {
    return this.getQueuePage(this.queueResourceUrl);
  }

  getQueuePage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if (descriptionFilter.length > 0) {
      params = params.append('descriptionFilter', descriptionFilter);
    }
    return this.httpClient.get<QueuePage>(url, { params: params });
  }

  deleteOrder(order: Order) {
    return this.httpClient.delete(Util.getHrefForRel(order,'self'));
  }

  getFileReportsForBatchReportId(batchRepId: number) {
    return this.httpClient.get<FileReportsPage>(this.fileReportsResourceUrl + '?batchReportId=' + batchRepId).pipe(
      tap((page: FileReportsPage) => {
        this.lastFetchedFileReportsPage = page;
      })
    );
  }

  getFileReportsPage(url: string, descriptionFilter = '') {
    let params: HttpParams = new HttpParams();
    if (descriptionFilter.length > 0) {
      params = params.append('descriptionFilter', descriptionFilter);
    }
    return this.httpClient.get<FileReportsPage>(url, { params: params }).pipe(
      tap((page: FileReportsPage) => {
        this.lastFetchedFileReportsPage = page;
      })
    );
  }

  getChecksPage(url: string, typeFilter = '') {
    let params: HttpParams = new HttpParams();
    if (typeFilter.length > 0) {
      params = params.append('type', typeFilter);
    }
    return this.httpClient.get<ChecksPage>(url, { params: params });
  }

  getFileReportBytId(id: number) {
    if (this.lastFetchedFileReportsPage) {
      for(let report of this.lastFetchedFileReportsPage._embedded['file-reports']) {
        if (report.id === id) {
          return of(report);
        }
      }
    }
    return this.httpClient.get<FileReport>(this.fileReportsResourceUrl + '/' + id);
  }


}
