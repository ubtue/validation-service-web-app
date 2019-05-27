import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FileNameRulesPage } from '../../../shared/model/file-name-rules.model';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ConfigurationsService } from '../../configurations.service';
import { Util } from 'src/app/shared/util';
import { Resolved } from 'src/app/shared/model/resolved.model';



@Injectable()
export class FileNameRulesResolver implements Resolve<Resolved<FileNameRulesPage>> {

    constructor(private configurationsService: ConfigurationsService,
      private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<FileNameRulesPage>> {
      const resolved: Resolved<Configuration> = route.parent.data['configuration'];

      if (!resolved.data) {
        return of({
          data: null,
          errorMessage: resolved.errorMessage,
          errorStatusCode: resolved.errorStatusCode
        });
      }

      let config: Configuration =  resolved.data;
      return this.configurationsService.getFileNameRulesPage(Util.getHrefForRel(config,'file-name-rules'))
        .pipe(
          map(result => ({ data: result })),
          catchError(
            (error) => {
              console.log(`Retrieval of file name rules failed with error: ${error}`);
              return of({ data: null, errorMessage: 'Retrieval of file name rules failed', errorStatusCode: error.status });
            }
          )
        );
    }

}
