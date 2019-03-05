import { BatchReport } from 'src/app/shared/model/batch-report.model';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ResolveData } from '@angular/router';
import { ReportsService } from '../reports.service';
import { Observable, of } from 'rxjs';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';
import { catchError, map } from 'rxjs/operators';
import { Resolved } from 'src/app/shared/model/resolved.model';

@Injectable()
export class BatchReportResolver implements Resolve<Resolved<BatchReport>> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<BatchReport>> {
        const id = route.params['id'];

        if (isNaN(+id)) {
          console.log(`Error loading batch report: id is not a number: ${id} `);
          return of({ data: null, errorMessage: 'Error loading batch report: id is not a number: ' + id});
        }

        return this.reportsService.getBatchReportById(+id)
            .pipe(
              map(result => ({ data: result })),
                catchError(
                    (error) => {
                      console.log(`Loading of batch report failed with error: ${error}`);
                      return of({ data: null, errorMessage: 'Loading of batch report failed', errorStatusCode: error.status });
                    }
                )
            );
    }

}
