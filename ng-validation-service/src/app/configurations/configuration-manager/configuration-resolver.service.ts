import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Batch } from '../../shared/model/batch.model';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ConfigurationsService } from '../configurations.service';



@Injectable()
export class ConfigurationResolver implements Resolve<Configuration> {

    constructor(private configurationsService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Configuration> {
        let id = route.params['id'];

        if (isNaN(+id)) {
            console.log('Configuration id was not a number: ${id} ');
            this.router.navigate(['/configurations']);
            return of(null);
        }

        return this.configurationsService.getConfigurationById(+id)
            .pipe(
                catchError(
                    (error) => {
                        console.log('Retrieval error: ${error}');
                        this.router.navigate(['/configurations']);
                        // this.batchesService.batchListReloadRequested.next();
                        return of(null);
                    }
                )
            )
    }

}
