import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Batch } from '../../shared/model/batch.model';
import { Observable, of, empty } from 'rxjs';
import { UsersService } from '../users.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { User } from 'src/app/shared/model/user.model';



@Injectable()
export class UserResolver implements Resolve<Resolved<User>> {

  constructor(private usersServie: UsersService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolved<User>> {
    let id = route.params['id'];

    if (isNaN(+id)) {
      console.log(`Retrieval of batch failed: id is not a number: ${id}`);
      return of({ data: null, errorMessage: 'Retrieval of batch failed: id is not a number: ' + id });
    }

    return this.usersServie.getUserById(+id)
      .pipe(
        map(startPage => ({ data: startPage })),
        catchError(
          (error) => {
            console.log(`Retrieval of user failed with error: ${error}`);
            return of({ data: null, errorMessage: 'Retrieval of user failed', errorStatusCode: error.status });
          }
        )
      );
  }

}
