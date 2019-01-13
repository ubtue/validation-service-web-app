import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FileNameRulesPage } from '../../../../shared/model/file-name-rules.model';
import { Observable, of, empty } from 'rxjs';
import { Injectable, ɵConsole } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ConfigurationsService } from '../../../configurations.service';
import { Util } from 'src/app/shared/util';
import { FileNameRule } from 'src/app/shared/model/file-name-rule.model';



@Injectable()
export class FileNameRuleResolver implements Resolve<FileNameRule> {

    constructor(private configurationsService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FileNameRule> {
        let id = route.params['id'];
        console.log(id);
        if (isNaN(+id)) {
            console.log(`file name rule id was not a number: ${id} `);
            this.router.navigate(['/configurations']);
            return of(null);
        }

        return this.configurationsService.getFileNameRuleById(+id)
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
