import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ConfigurationsService } from '../../configurations.service';
import { Util } from 'src/app/shared/util';
import { FitsResultRulesPage } from 'src/app/shared/model/fits-result-rules.model';



@Injectable()
export class FitsResultRulesResolver implements Resolve<FitsResultRulesPage> {

    constructor(private configurationsService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FitsResultRulesPage> {
        const config: Configuration =  route.parent.data['configuration'];

        return this.configurationsService.getFitsResultRulesPage(Util.getHrefForRel(config, 'fits-result-rules'))
            .pipe(
                catchError(
                    (error) => {
                        console.log(`Retrieval error: ${error}`);
                        this.router.navigate(['/configurations']);
                        // this.batchesService.batchListReloadRequested.next();
                        return of(null);
                    }
                )
            )
    }

}
