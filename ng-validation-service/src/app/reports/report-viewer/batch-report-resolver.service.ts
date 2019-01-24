import { BatchReport } from 'src/app/shared/model/batch-report.model';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReportsService } from '../reports.service';
import { Observable, of } from 'rxjs';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BatchReportResolver implements Resolve<BatchReport> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BatchReport> {
        const id = route.params['id'];

        if (isNaN(+id)) {
            console.log('Batch Report id was not a number: ${id} ');
            this.router.navigate(['/reports']);
            return of(null);
        }

        return this.reportsService.getBatchReportById(+id)
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
