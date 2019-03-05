import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';
import { ActivatedRoute, Data, Router, NavigationEnd } from '@angular/router';
import { BatchReport } from 'src/app/shared/model/batch-report.model';
import { Util } from 'src/app/shared/util';
import { FileReport } from 'src/app/shared/model/file-report.model';
import { ViewerStateService } from './viewer-state.service';
import { Subscription } from 'rxjs';
import { FileReportResolver } from './file-report-resolver.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Message } from 'primeng/api';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css'],
  providers: [ViewerStateService, FileReportResolver]
})
export class ReportViewerComponent implements OnInit, OnDestroy {

  fileReportsPage: FileReportsPage;
  batchReport: BatchReport;
  fileReport: FileReport;
  resolveCamelCase = Util.unCamelCase;
  showingFileReport = false;
  viewerStateSubscription: Subscription;
  errorMessages: Message[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private viewerService: ViewerStateService,
    private changeDetectorRef: ChangeDetectorRef,
    private errorService: ErrorService) { }

  ngOnInit() {

    this.route.data.subscribe(
      (data: Data) => {
        const resolvedBatchReport: Resolved<BatchReport> = data['batchReport'];
        const resolvedFileReportsPage: Resolved<FileReportsPage> = data['fileReportsPage'];

        if (!resolvedBatchReport.data) {
          this.errorService.resolved = resolvedBatchReport;
          this.router.navigate(['/error']);
        }
        if (!resolvedFileReportsPage.data) {
          this.errorService.resolved = resolvedFileReportsPage;
          this.router.navigate(['/error']);
        }

        this.fileReportsPage = resolvedFileReportsPage.data;
        this.batchReport = resolvedBatchReport.data;
        if (!this.batchReport.summary) {
          const message: Message = {severity: 'error', summary:'Error:', detail:'Batch processing failed. Check server log for details', closable:false, sticky:true};
          this.errorMessages.push(message);
        }
      }
    );

    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if(this.route.children.length === 0) {
            this.showingFileReport = false;
          }
        }
      }
    );

    // if url to file report is entered directly, report must be set from child
    this.viewerStateSubscription = this.viewerService.selectedFileReport.subscribe(
      (report: FileReport) => {
        this.fileReport = report;
        this.showingFileReport = true;
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.viewerStateSubscription.unsubscribe();
  }

  onSelectFileReport(report: FileReport) {
    this.fileReport = report;
    this.showingFileReport = true;
    this.router.navigate([report.id], {relativeTo: this.route});
  }

}
