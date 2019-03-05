import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FileNameRulesPage } from '../../../../shared/model/file-name-rules.model';
import { Observable, of, empty } from 'rxjs';
import { Injectable, ɵConsole } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ConfigurationsService } from '../../../configurations.service';
import { Util } from 'src/app/shared/util';
import { FileNameRule } from 'src/app/shared/model/file-name-rule.model';
import { FitsResultRule } from 'src/app/shared/model/fits.result-rule.model';
import { ResolvedData } from 'src/app/shared/model/resolved-data.model';



@Injectable()
export class FitsResultRuleResolver implements Resolve<ResolvedData<FitsResultRule>> {

    constructor(private configurationsService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData<FitsResultRule>> {
        let id = route.params['id'];
        if (isNaN(+id)) {
          console.log(`Error loading rule: Id is not a number: ${id} `);
          return of({ data: null, errorMessage: 'Error loading rule: Id is not a number: ' + id});
      }

        return this.configurationsService.getFitsResultRuleById(+id)
            .pipe(
              map(result => ({ data: result })),
                catchError(
                    (error) => {
                      console.log(`Loading of rule failed with error: ${error}`);
                      return of({ data: null, errorMessage: 'Loading of rule failed', errorStatusCode: error.status });
                    }
                )
            );

    }

}
