import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BatchPage } from '../shared/model/batches.model';
import { Observable } from 'rxjs';
import { BatchesService } from './batches.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BatchesResolver implements Resolve<BatchPage> {

    constructor(private batchesService: BatchesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<BatchPage> {
        return this.batchesService.getBatchesStartPage();
    }
    
}