import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';
import { ReportsService } from '../reports.service';
import { ResolvedData } from 'src/app/shared/model/resolved-data.model';



@Injectable()
export class FileReportsListResolver implements Resolve<ResolvedData<FileReportsPage>> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData<FileReportsPage>> {
        const id = route.params['id'];

        if (isNaN(+id)) {
          console.log(`Error loading file reports: Batch report id is not a number: ${id} `);
          return of({ data: null, errorMessage: 'Error loading file reports: Batch report id is not a number: ' + id});
        }

        return this.reportsService.getFileReportsForBatchReportId(+id)
            .pipe(
              map(result => ({ data: result })),
                catchError(
                    (error) => {
                      console.log(`Loading of file reports failed with error: ${error}`);
                      return of({ data: null, errorMessage: 'Loading of file reports failed', errorStatusCode: error.status });
                    }
                )
            );
    }

}
