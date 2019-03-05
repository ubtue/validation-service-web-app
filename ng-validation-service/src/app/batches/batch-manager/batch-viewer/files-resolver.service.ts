import {
  Resolve,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { FilesPage } from "src/app/shared/model/files.model";
import { BatchesService } from "../../batches.service";
import { Observable, of, empty } from "rxjs";
import { Injectable } from "@angular/core";
import { Batch } from "src/app/shared/model/batch.model";
import { Util } from "src/app/shared/util";
import { catchError, map } from "rxjs/operators";
import { Resolved } from "src/app/shared/model/resolved.model";

@Injectable()
export class FilesResolver implements Resolve<Resolved<FilesPage>> {
  constructor(private batchesService: BatchesService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Resolved<FilesPage>> {
    let resolvedData: Resolved<Batch> = route.parent.data["batch"];
    if (!resolvedData.data) {
      return of({
        data: null,
        errorMessage: resolvedData.errorMessage,
        errorStatusCode: resolvedData.errorStatusCode
      });
    }

    let batch: Batch = resolvedData.data;

    return this.batchesService
      .getFilesPage(Util.getHrefForRel(batch, "files"))
      .pipe(
        map(result => ({ data: result })),
        catchError(error => {
          console.log(`Retrieval of files failed with error: ${error}`);
          return of({
            data: null,
            errorMessage: "Retrieval of files failed",
            errorStatusCode: error.status
          });
        })
      );
  }
}
