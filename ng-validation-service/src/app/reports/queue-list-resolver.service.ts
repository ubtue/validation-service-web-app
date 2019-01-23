import { Injectable } from '@angular/core';
import { QueuePage } from '../shared/model/queue-order.model';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReportsService } from './reports.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class QueueResolver implements Resolve<QueuePage> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QueuePage> {
        return this.reportsService.getQueueStartPage()
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
