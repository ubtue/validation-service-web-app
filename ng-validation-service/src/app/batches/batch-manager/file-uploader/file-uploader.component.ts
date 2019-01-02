import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Batch } from 'src/app/shared/model/batch.model';
import { Message } from 'src/app/shared/model/primeng-message.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Util } from 'src/app/shared/util';
import { Link } from '../../../shared/model/common-interfaces.model';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service';
import { Observable, Observer } from 'rxjs';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploaderComponent implements OnInit, CanDeactivateGuard {

  hrefToRel = Util.getHrefForRel;
  selectedBatch: Batch;
  messages: Message[];
  uploadInProgress: boolean;

  constructor(private route: ActivatedRoute, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: Data) => {
        this.selectedBatch = data['batch'];
        this.messages = [];
      }
    )
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
  }

  onFinishUpload(event) {
    let message = new Message();
    message.severity = 'success';
    message.summary = 'Upload finished:'
    message.detail = `${event.files.length} files`
    this.messages.push(message);
    this.uploadInProgress = false;
  }

  onUploadError(event) {
    this.uploadInProgress = false;
    let message = new Message();
    message.severity = 'warn';
    message.summary = 'Upload of some files failed:';
    message.detail = `${event.files.length} files`
    this.messages.push(message);
  }

  onClearWithoutFullUpload() {
    this.uploadInProgress = false;
  }

}
