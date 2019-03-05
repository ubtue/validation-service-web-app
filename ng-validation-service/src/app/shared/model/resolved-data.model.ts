import { HttpErrorResponse } from '@angular/common/http';

export class ResolvedData<T> {
  data: T;
  errorMessage?: string;
  errorStatusCode?: number;
}
