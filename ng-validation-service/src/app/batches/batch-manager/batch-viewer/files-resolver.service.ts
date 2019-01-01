import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FilesPage } from 'src/app/shared/model/files.model';
import { BatchesService } from '../../batches.service';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FilesResolver implements Resolve<FilesPage> {
    
    constructor(private batchesService: BatchesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FilesPage> {
        route.parent.data['batch'];
        console.log(route.parent.data['batch']);
        return of(null);
        // if (isNaN(+id)) {
        //     console.log('Batch id was not a number: ${id} ')
        //     this.router.navigate(['/batches'])
        //     return of(null);
        // }

        // return this.batchesService.getBatchById(+id)
        //     .pipe(
        //         catchError(
        //             (error) => {
        //                 console.log('Retrieval error: ${error}')
        //                 this.router.navigate(['/batches'])
        //                 this.batchesService.listReloadRequested.next();
        //                 return of(null);
        //             }
        //         )
        //     )
    }


}