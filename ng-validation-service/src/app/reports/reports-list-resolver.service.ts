import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BatchReportsPage } from 'src/app/shared/model/batch-reports.model';
import { ReportsService } from './reports.service';
import { Resolved } from '../shared/model/resolved.model';



@Injectable()
export class ReportsResolver implements Resolve<Resolved<BatchReportsPage>> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<BatchReportsPage>> {
        return this.reportsService.getReportsStartPage()
            .pipe(
              map(result => ({ data: result })),
                catchError(
                    (error) => {
                      console.log(`Loading of reports failed with error: ${error}`);
                      return of({ data: null, errorMessage: 'Loading of reports failed', errorStatusCode: error.status });
                    }
                )
            );
    }

}

