import { DataService } from '../shared/services/data.service';
import { BatchPage } from '../shared/model/batches.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BatchesService {

    batchesResourceUrl: string = environment.apiBaseUrl+'/batches';

    pageChanged: Subject<BatchPage> = new Subject<BatchPage>();
    
    constructor(private dataService: DataService, private httpClient: HttpClient){};

    getBatchById(id: number) {

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

    // getPageSelfRef(page: BatchPage): string {
    //     for(let link of page._links) {
    //         if(link.rel === 'self')
    //             return link.href
    //     }
    //     return null;
    // }


}