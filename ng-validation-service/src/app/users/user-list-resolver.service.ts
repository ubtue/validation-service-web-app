import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ResolveData } from '@angular/router';
import { BatchPage } from '../shared/model/batches.model';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Resolved } from '../shared/model/resolved.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersPage } from '../shared/model/users.model';
import { UsersService } from './users.service';


@Injectable()
export class UserListResolver implements Resolve<Resolved<UsersPage>> {

    constructor(private usersService: UsersService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<UsersPage>> {
      return this.usersService.getUsersStartPage()
        .pipe(
          map(startPage => ({ data: startPage })),
          catchError(
            (error) => {
              console.log(`Retrieval of users page failed with error: ${error}`);
              return of({ data: null, errorMessage: 'Retrieval of users page failed', errorStatusCode: error.status });
            }
          )
        );
    }
}
