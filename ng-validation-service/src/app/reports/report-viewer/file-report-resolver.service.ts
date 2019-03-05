import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReportsService } from '../reports.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileReport } from 'src/app/shared/model/file-report.model';
import { ResolvedData } from 'src/app/shared/model/resolved-data.model';

@Injectable()
export class FileReportResolver implements Resolve<ResolvedData<FileReport>> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData<FileReport>> {
        const id = route.params['id'];

        if (isNaN(+id)) {
          console.log(`Error loading file report: id is not a number: ${id} `);
          return of({ data: null, errorMessage: 'Error loading file report: id is not a number: ' + id});
        }

        return this.reportsService.getFileReportBytId(+id)
            .pipe(
              map(result => ({ data: result })),
                catchError(
                    (error) => {
                      console.log(`Loading of file report failed with error: ${error}`);
                      return of({ data: null, errorMessage: 'Loading of file report failed', errorStatusCode: error.status });
                    }
                )
            );
    }

}
