import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ConfigurationsPage } from '../shared/model/configurations.model';
import { ConfigurationsService } from './configurations.service';
import { Resolved } from '../shared/model/resolved.model';


@Injectable()
export class ConfigurationsResolver implements Resolve<Resolved<ConfigurationsPage>> {

    constructor(private configurationService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<ConfigurationsPage>> {
      return this.configurationService.getConfigurationsStartPage()
        .pipe(
          map(startPage => ({ data: startPage })),
            catchError(
                (error) => {
                  console.log(`Retrieval of configurations page failed with error: ${error}`);
                  return of({ data: null, errorMessage: 'Retrieval of configurations page failed', errorStatusCode: error.status });
                }
            )
        );
    }

}
