import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Batch } from '../../shared/model/batch.model';
import { Observable, of, empty } from 'rxjs';
import { BatchesService } from '../batches.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ResolvedData } from 'src/app/shared/model/resolved-data.model';



@Injectable()
export class BatchResolver implements Resolve<ResolvedData<Batch>> {

    constructor(private batchesService: BatchesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData<Batch>> {
        let id = route.params['id'];

        if (isNaN(+id)) {
            console.log('Batch id was not a number: ${id} ')
            return of({ data: null, errorMessage: 'Retrieval of batch failed: id was not a number'});
        }

        return this.batchesService.getBatchById(+id)
            .pipe(
                map(startPage => ({ data: startPage })),
                catchError(
                    (error) => {
                        // console.log('Retrieval error: ${error}')
                        // this.router.navigate(['/batches'])
                        // this.batchesService.batchListReloadRequested.next();
                        console.log(`Retrieval of batch failed with error: ${error}`);
                        return of({ data: null, errorMessage: 'Retrieval of batch failed', errorStatusCode: error.status });
                        // return of(null);
                    }
                )
            );
    }

}
