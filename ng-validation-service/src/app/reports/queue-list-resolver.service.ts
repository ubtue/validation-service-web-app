import { Injectable } from '@angular/core';
import { QueuePage } from '../shared/model/queue-order.model';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReportsService } from './reports.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Resolved } from '../shared/model/resolved.model';

@Injectable()
export class QueueResolver implements Resolve<Resolved<QueuePage>> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<QueuePage>> {
        return this.reportsService.getQueueStartPage()
            .pipe(
              map(result => ({ data: result })),
                catchError(
                    (error) => {
                      console.log(`Loading of scheduled reports failed with error: ${error}`);
                      return of({ data: null, errorMessage: 'Loading of scheduled reports failed', errorStatusCode: error.status });
                    }
                )
            );
    }

}
