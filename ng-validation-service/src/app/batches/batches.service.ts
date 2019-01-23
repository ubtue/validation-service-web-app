import { DataService } from '../shared/services/data.service';
import { BatchPage } from '../shared/model/batches.model';
import { Link } from '../shared/model/common-interfaces.model';
import { Batch } from '../shared/model/batch.model';
import { FilesPage } from '../shared/model/files.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Util } from '../shared/util';
import { File } from '../shared/model/file.model';
import { BatchValidationOrder } from '../shared/model/batch-validation-order.model';

@Injectable()
export class BatchesService {

    batchesResourceUrl: string = environment.apiBaseUrl+'/batches';
    queueResourceUrl: string = environment.apiBaseUrl+'/queue';

    resetBatchListRequested:  Subject<void> = new Subject<void>();
    batchListReloadRequested: Subject<void> = new Subject<void>();

    constructor(private dataService: DataService, private httpClient: HttpClient){};

    createBatch(batch: Batch) {
        return this.httpClient.post<Batch>(this.batchesResourceUrl, batch);
    }

    getBatchById(id: number) {
        return this.httpClient.get<Batch>(this.batchesResourceUrl + '/' +id);
    }

    deleteBatch(batch: Batch) {
        return this.httpClient.delete(Util.getHrefForRel(batch,'self'));
    }

    getBatchesStartPage() {
        return this.httpClient.get<BatchPage>(this.batchesResourceUrl);
    }

    getBatchesPage(url: string, orderDatesDesc = true, descriptionFilter = '') {

        let params: HttpParams = new HttpParams();
        params = params.append('orderBy', orderDatesDesc ? 'DATE_DESC' : 'DATE_ASC' );

        if(descriptionFilter.length > 0) {
            params = params.append('descriptionFilter', descriptionFilter );
        }

        return this.httpClient.get<BatchPage>(url, {params: params}) ;
    }

    getFilesPage(url: string, fileNameFilter = '') {
        let params: HttpParams = new HttpParams();

        if(fileNameFilter.length > 0) {
            params = params.append('fileNameFilter', fileNameFilter );
        }
        return this.httpClient.get<FilesPage>(url, {params: params});
    }

    refetchFilesPage(page: FilesPage) {
        console.log('files')
        console.log(page)
        return this.httpClient.get<FilesPage>(Util.getHrefForRel(page,'self'));
    }

    deleteFile(file: File) {
        return this.httpClient.delete(Util.getHrefForRel(file,'self'));
    }

    submitValidationOrder(order: BatchValidationOrder) {
      return this.httpClient.post<void>(this.queueResourceUrl, order);
    }


}
