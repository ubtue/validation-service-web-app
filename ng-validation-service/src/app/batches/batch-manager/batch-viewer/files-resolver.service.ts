import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FilesPage } from 'src/app/shared/model/files.model';
import { BatchesService } from '../../batches.service';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { Batch } from 'src/app/shared/model/batch.model';
import { Util } from 'src/app/shared/util';
import { catchError } from 'rxjs/operators';


@Injectable()
export class FilesResolver implements Resolve<FilesPage> {
    
    constructor(private batchesService: BatchesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FilesPage> {
        let batch: Batch = route.parent.data['batch'];
        console.log(route.parent.data['batch']);

        return this.batchesService.getFilesPage(Util.getHrefForRel(batch,'files'))
            .pipe(
                catchError(
                    (error) => {
                        console.log(`Retrieval error: ${error}`)
                        this.router.navigate(['/batches'])
                        this.batchesService.batchListReloadRequested.next();
                        return of(null);
                    }
                )
            )
    }
}