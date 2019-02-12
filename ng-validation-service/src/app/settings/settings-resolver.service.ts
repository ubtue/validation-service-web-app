import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationSettings } from '../shared/model/settings.model';
import { SettingsService } from './settings.service';

@Injectable()
export class ApplicationSettingsResolver implements Resolve<ApplicationSettings> {

    constructor(private settingsService: SettingsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApplicationSettings> {

        return this.settingsService.getSettings()
            .pipe(
                catchError(
                    (error) => {
                        console.log(`Retrieval error: ${error}`);
                        this.router.navigate(['/reports']);
                        return of(null);
                    }
                )
            );
    }

}
