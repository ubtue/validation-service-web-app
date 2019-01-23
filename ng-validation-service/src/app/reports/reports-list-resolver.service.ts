import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BatchReportsPage } from 'src/app/shared/model/batch-reports.model';
import { ReportsService } from './reports.service';



@Injectable()
export class ReportsResolver implements Resolve<BatchReportsPage> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BatchReportsPage> {
        return this.reportsService.getReportsStartPage()
            .pipe(
                catchError(
                    (error) => {
                        console.log('Retrieval error: ${error}');
                        this.router.navigate(['/configurations']);
                        // this.batchesService.batchListReloadRequested.next();
                        return of(null);
                    }
                )
            );
    }

}

