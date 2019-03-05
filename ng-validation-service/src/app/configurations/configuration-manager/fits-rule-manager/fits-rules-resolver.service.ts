import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ConfigurationsService } from '../../configurations.service';
import { Util } from 'src/app/shared/util';
import { FitsResultRulesPage } from 'src/app/shared/model/fits-result-rules.model';
import { ResolvedData } from 'src/app/shared/model/resolved-data.model';



@Injectable()
export class FitsResultRulesResolver implements Resolve<ResolvedData<FitsResultRulesPage>> {

    constructor(private configurationsService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData<FitsResultRulesPage>> {

        let resolved: ResolvedData<Configuration> = route.parent.data['configuration'];

        if (!resolved.data) {
          return of({
            data: null,
            errorMessage: resolved.errorMessage,
            errorStatusCode: resolved.errorStatusCode
          });
        }

        const config: Configuration =  resolved.data;

        return this.configurationsService.getFitsResultRulesPage(Util.getHrefForRel(config, 'fits-result-rules'))
            .pipe(
              map(result => ({ data: result })),
                catchError(
                    (error) => {

                      console.log(`Retrieval of fits result rules failed with error: ${error}`);
                      return of({
                        data: null,
                        errorMessage: "Retrieval of fits result rules failed",
                        errorStatusCode: error.status
                      });
                    }
                )
            );
    }

}
