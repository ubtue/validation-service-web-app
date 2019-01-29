import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReportsService } from '../reports.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileReport } from 'src/app/shared/model/file-report.model';

@Injectable()
export class FileReportResolver implements Resolve<FileReport> {

    constructor(private reportsService: ReportsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FileReport> {
        const id = route.params['id'];

        if (isNaN(+id)) {
            console.log('File Report id was not a number: ${id} ');
            this.router.navigate(['/reports']);
            return of(null);
        }

        return this.reportsService.getFileReportBytId(+id)
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