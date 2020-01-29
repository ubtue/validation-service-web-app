import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ResolveData } from '@angular/router';
import { BatchPage } from '../shared/model/batches.model';
import { Observable, of, empty } from 'rxjs';
import { BatchesService } from './batches.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Resolved } from '../shared/model/resolved.model';


@Injectable()
export class BatchesResolver implements Resolve<Resolved<BatchPage>> {

  constructor(private batchesService: BatchesService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<BatchPage>> {
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
