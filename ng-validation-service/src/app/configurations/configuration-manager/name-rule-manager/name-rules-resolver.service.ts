import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { FileNameRulesPage } from '../../../shared/model/file-name-rules.model';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ConfigurationsService } from '../../configurations.service';
import { Util } from 'src/app/shared/util';



@Injectable()
export class FileNameRulesResolver implements Resolve<FileNameRulesPage> {

    constructor(private configurationsService: ConfigurationsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FileNameRulesPage> {
        let config: Configuration =  route.parent.data['configuration'];
       
        return this.configurationsService.getFileNameRulesPage(Util.getHrefForRel(config,'file-name-rules'))
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
