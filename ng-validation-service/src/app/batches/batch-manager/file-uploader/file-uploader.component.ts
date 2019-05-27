import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Batch } from 'src/app/shared/model/batch.model';
import { Message } from 'src/app/shared/model/primeng-message.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Util } from 'src/app/shared/util';
import { Link } from '../../../shared/model/common-interfaces.model';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service';
import { Observable, Observer } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';
import { FileUpload } from 'primeng/fileupload';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploaderComponent implements OnInit, CanDeactivateGuard {

  @ViewChild('fileUpload') fileUpload: FileUpload;

  hrefToRel = Util.getHrefForRel;
  selectedBatch: Batch;
  messages: Message[];
  uploadInProgress: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: Data) => {
        const resolved: Resolved<Batch> = data['batch'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }
        this.selectedBatch = resolved.data;
        this.messages = [];
      }
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create((observer: Observer<boolean>) => {
      if (!this.uploadInProgress) {
        observer.next(true);
        observer.complete();
        return;
      }

      this.confirmationService.confirm({
        message: 'Upload process has not finished!',
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  onSelectFiles() {
    this.messages = [];
  }

  onBeforeUpload(event) {
    this.uploadInProgress = true;
    this.fileUpload.showUploadButton = false;
    this.fileUpload.disabled = true;
  }

  onFinishUpload(event) {
    let message = new Message();
    message.severity = 'success';
    message.summary = 'Upload finished:';
    message.detail = `${event.files.length} files`;
    this.messages.push(message);
    this.uploadInProgress = false;
    this.fileUpload.showUploadButton = true;
    this.fileUpload.disabled = false;
  }

  onUploadError(event) {
    this.uploadInProgress = false;
    let message = new Message();
    message.severity = 'warn';
    message.summary = 'Upload of some files failed:';
    message.detail = `${event.files.length} files`;
    this.messages.push(message);
    this.fileUpload.showUploadButton = true;
    this.fileUpload.disabled = false;
  }

  onClearWithoutFullUpload() {
    this.uploadInProgress = false;
  }

  remove(event, file) {
    this.fileUpload.remove(event,  this.fileUpload.files.indexOf(file));

  }


}
