import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BatchPage } from '../model/batches.model';

@Injectable()
export class DataService implements OnInit {

    private apiBaseUrl: string = environment.apiBaseUrl


    constructor(private httpClient: HttpClient) {}


    ngOnInit() {

    }





} 
