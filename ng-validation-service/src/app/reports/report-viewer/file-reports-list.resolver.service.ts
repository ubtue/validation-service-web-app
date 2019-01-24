import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';
import { ReportsService } from '../reports.service';



@Injectable()
export class FileReportsListResolver implements Resolve<FileReportsPage> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FileReportsPage> {
        const id = route.params['id'];

        if (isNaN(+id)) {
            console.log('Batch Report id was not a number: ${id} ');
            this.router.navigate(['/reports']);
            return of(null);
        }

        return this.reportsService.getFileReportsForBatchReportId(+id)
            .pipe(
                catchError(
                    (error) => {
                        console.log(`Retrieval error: ${error}`);
                        this.router.navigate(['/reports']);
                        // this.batchesService.batchListReloadRequested.next();
                        return of(null);
                    }
                )
            );
    }

}
