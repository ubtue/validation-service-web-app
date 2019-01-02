import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Batch } from '../../shared/model/batch.model';
import { Observable, of, empty } from 'rxjs';
import { BatchesService } from '../batches.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';



@Injectable()
export class BatchResolver implements Resolve<Batch> {

    constructor(private batchesService: BatchesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Batch> {
        let id = route.params['id'];

        if (isNaN(+id)) {
            console.log('Batch id was not a number: ${id} ')
            this.router.navigate(['/batches'])
            return of(null);
        }

        return this.batchesService.getBatchById(+id)
            .pipe(
                catchError(
                    (error) => {
                        console.log('Retrieval error: ${error}')
                        this.router.navigate(['/batches'])
                        this.batchesService.batchListReloadRequested.next();
                        return of(null);
                    }
                )
            )
    }

}