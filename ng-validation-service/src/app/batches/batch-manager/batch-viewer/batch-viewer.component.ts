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
  fileNameFilter: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private confirmationService: ConfirmationService,
              private batchesService: BatchesService,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        let resolved: Resolved<FilesPage> = data['filesPage'];
        if(!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }
        this.filesPage = resolved.data;
        this.messages = [];
      }
    );

    // handle search text input
    this.searchTextSubscription = this.searchTextChanged.pipe(debounceTime(400), distinctUntilChanged()).subscribe(
      (filter) => {
        this.fileNameFilter = filter;
        this.batchesService.getFilesPage(this.hrefToRel(this.route.parent.snapshot.data['batch'],'files'), this.fileNameFilter).subscribe(
          (page: FilesPage) => {
            this.filesPage = page;
          }
        )
      }
    )
  }

  /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.batchesService.getFilesPage(url).subscribe(
      (page: FilesPage) => {
        this.filesPage = page;
      }
    )
  }

  onDeleteFile(file: File) {
    console.log(file)
    this.batchesService.deleteFile(file).subscribe(

      (data) => {
        this.refreshFileList();
      },

      (error) => {
        console.log(error);
      }
    )
  }

  refreshFileList() {
    this.batchesService.refetchFilesPage(this.filesPage).subscribe(
      (page: FilesPage) => {
        this.filesPage = page;
      },

      (error) => {
        console.log(error);
      }
    )
  }


}
