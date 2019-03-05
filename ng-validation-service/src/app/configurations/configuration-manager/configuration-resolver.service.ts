import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Batch } from '../../shared/model/batch.model';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ConfigurationsService } from '../configurations.service';
import { Resolved } from 'src/app/shared/model/resolved.model';



@Injectable()
export class ConfigurationResolver implements Resolve<Resolved<Configuration>> {

    constructor(private configurationsService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<Configuration>> {
      let id = route.params['id'];

      if (isNaN(+id)) {
        console.log(`Retrieval of configuration failed: id is not a number: ${id}`);
        return of({ data: null, errorMessage: 'Retrieval of configuration failed: id is not a number: ' + id});
      }

      return this.configurationsService.getConfigurationById(+id)
        .pipe(
          map(startPage => ({ data: startPage })),
            catchError(
              (error) => {
                console.log(`Retrieval of configuration failed with error: ${error}`);
                return of({ data: null, errorMessage: 'Retrieval of configuration failed', errorStatusCode: error.status });
              }
           )
        );
    }

}
