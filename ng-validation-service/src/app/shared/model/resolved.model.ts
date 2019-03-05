import { HttpErrorResponse } from '@angular/common/http';

export class Resolved<T> {
  data: T;
  errorMessage?: string;
  errorStatusCode?: number;
}
