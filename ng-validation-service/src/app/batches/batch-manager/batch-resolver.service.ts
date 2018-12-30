import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Batch } from '../../shared/model/batch.model';
import { Observable } from 'rxjs';
import { BatchesService } from '../batches.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BatchResolver implements Resolve<Batch> {

    constructor(private batchesService: BatchesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Batch> {
        return this.batchesService.getBatchById(+route.params['id']);
    }
    
}