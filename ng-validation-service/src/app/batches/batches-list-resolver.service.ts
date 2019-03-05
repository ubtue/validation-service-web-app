import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ResolveData } from '@angular/router';
import { BatchPage } from '../shared/model/batches.model';
import { Observable, of, empty } from 'rxjs';
import { BatchesService } from './batches.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ResolvedData } from '../shared/model/resolved-data.model';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class BatchesResolver implements Resolve<ResolvedData<BatchPage>> {

    constructor(private batchesService: BatchesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData<BatchPage>> {
        return this.batchesService.getBatchesStartPage()
        .pipe(
          map(startPage => ({ data: startPage })),
          catchError(
            (error) => {
              console.log(`Retrieval of batches page failed with error: ${error}`);
              return of({ data: null, errorMessage: 'Retrieval of batches page failed', errorStatusCode: error.status });
            }
          )
        );
    }
}
