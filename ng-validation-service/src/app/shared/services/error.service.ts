import { HttpErrorResponse } from '@angular/common/http';
import { Resolved } from '../model/resolved.model';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorService {
  resolved: Resolved<any>;

  constructor(private messageService: MessageService) {}

  raiseGlobalErrorMessage(description: string, errorResponse: HttpErrorResponse) {
    let summary: string;
    if (errorResponse) {
      if (!errorResponse.status || errorResponse.status === 0) {
        summary = 'Failure to connect';
      } else {
        summary = 'HTTP ' + errorResponse.status;
      }

      if (errorResponse.error && errorResponse.error.message) {
        description = errorResponse.error.message;
      }

    } else {
      summary = 'Unknown problem';
    }



    this.messageService.add({key: 'globalToast', severity: 'error', summary: summary, detail: description});
  }

}
