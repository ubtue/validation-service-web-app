import { DataService } from '../shared/services/data.service';
import { BatchPage } from '../shared/model/batches.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class BatchesService {


    private apiBaseUrl: string = environment.apiBaseUrl

    pageChanged: Subject<BatchPage> = new Subject<BatchPage>();
    
    constructor(private dataService: DataService, private httpClient: HttpClient){};


    getBatchById(id: number) {

    }

    getBatchesStartPage() {
        return this.httpClient.get<BatchPage>(this.apiBaseUrl+'/batches');
    }

    getBatchesPage(url: string) {
        return this.httpClient.get<BatchPage>(url);
    }


}