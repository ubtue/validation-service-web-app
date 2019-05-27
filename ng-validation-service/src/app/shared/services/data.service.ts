import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BatchPage } from '../model/batches.model';
import { FileReportsPage } from '../model/file-reports.model';

@Injectable()
export class DataService implements OnInit {

    lastShownFileReportsPage: FileReportsPage;

    constructor(private httpClient: HttpClient) {}

    ngOnInit() {}

}
