import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BatchPage } from '../shared/model/batches.model';
import { Observable, of, empty } from 'rxjs';
import { BatchesService } from './batches.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';


@Injectable()
export class BatchesResolver implements Resolve<BatchPage> {

    constructor(private batchesService: BatchesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<BatchPage> {
        return this.batchesService.getBatchesStartPage()
        .pipe(
            catchError(
                (error) => {
                    console.log('Retrieval of batches start page failed with error: ${error}')
                    // this.router.navigate(['/'])
                    return of(null);
                }
            )
        )
    }
    
}