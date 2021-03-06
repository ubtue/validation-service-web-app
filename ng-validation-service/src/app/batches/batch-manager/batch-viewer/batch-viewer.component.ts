import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/shared/model/batch.model';
import { Message } from 'src/app/shared/model/primeng-message.model';
import { ActivatedRoute, Data, ResolveData, Router } from '@angular/router';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Util } from 'src/app/shared/util';
import { FilesPage } from 'src/app/shared/model/files.model';
import { File } from 'src/app/shared/model/file.model';
import { BatchesService } from '../../batches.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/services/error.service';
import { Resolved } from 'src/app/shared/model/resolved.model';

@Component({
  selector: 'app-batch-viewer',
  templateUrl: './batch-viewer.component.html',
  styleUrls: ['./batch-viewer.component.css']
})
export class BatchViewerComponent implements OnInit {

  filesPage: FilesPage;
  messages: Message[];
  hrefToRel = Util.getHrefForRel;
  searchTextSubscription: Subscription;
  searchTextChanged = new Subject<string>();
  fileNameFilter = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private batchesService: BatchesService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        const resolved: Resolved<FilesPage> = data['filesPage'];
        if (!resolved.data) {
          if (resolved.errorStatusCode === 404) {
            this.router.navigate(['../../'], { relativeTo: this.route });
          } else {
            this.errorService.resolved = resolved;
            this.router.navigate(['/error']);
          }
        }
        this.filesPage = resolved.data;
        this.messages = [];
      }
    );

    // handle search text input
    this.searchTextSubscription = this.searchTextChanged.pipe(debounceTime(400), distinctUntilChanged()).subscribe(
      (filter) => {
        this.fileNameFilter = filter;
        const resolvedBatch: Resolved<Batch> = this.route.parent.snapshot.data['batch'];

        if (!resolvedBatch.data) {
          return;
        }

        this.batchesService.getFilesPage(this.hrefToRel(resolvedBatch.data, 'files'), this.fileNameFilter).subscribe(
          (page: FilesPage) => {
            this.filesPage = page;
          },
          (error) => {
            this.errorService.raiseGlobalErrorMessage('Search failed', error);
          }
        );
      }
    );
  }

  /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.batchesService.getFilesPage(url).subscribe(
      (page: FilesPage) => {
        this.filesPage = page;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to load file list', error);
      }
    );
  }

  onDeleteFile(file: File) {
    this.batchesService.deleteFile(file).subscribe(
      (data) => {
        this.refreshFileList();
      },
      (error) => {
        if (error.status === 404) {
          this.refreshFileList();
        } else {
          this.errorService.raiseGlobalErrorMessage('File could not be deleted', error);
        }
      }
    );
  }

  refreshFileList() {
    this.batchesService.refetchFilesPage(this.filesPage).subscribe(
      (page: FilesPage) => {
        this.filesPage = page;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to load file list', error);
      }
    );
  }
}
