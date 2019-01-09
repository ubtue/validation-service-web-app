import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ConfigurationsPage } from '../shared/model/configurations.model';
import { ConfigurationsService } from './configurations.service';


@Injectable()
export class ConfigurationsResolver implements Resolve<ConfigurationsPage> {

    constructor(private configurationService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ConfigurationsPage> {
        return this.configurationService.getConfigurationsStartPage()
        .pipe(
            catchError(
                (error) => {
                    console.log('Retrieval of batches start page failed with error: ${error}');
                    // this.router.navigate(['/'])
                    return of(null);
                }
            )
        );
    }

}
