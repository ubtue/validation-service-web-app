import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApplicationSettings } from '../shared/model/settings.model';
import { SettingsService } from './settings.service';
import { Resolved } from '../shared/model/resolved.model';

@Injectable()
export class ApplicationSettingsResolver implements Resolve<Resolved<ApplicationSettings>> {

    constructor(private settingsService: SettingsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<ApplicationSettings>> {

        return this.settingsService.getSettings()
            .pipe(
              map(result => ({ data: result })),
                catchError(
                    (error) => {
                      console.log(`Loading of global settings failed with error: ${error}`);
                      return of({ data: null, errorMessage: 'Loading of global settings failed', errorStatusCode: error.status });
                    }
                )
            );
    }

}
