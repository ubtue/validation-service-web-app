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

  constructor(private route: ActivatedRoute, private router: Router, private viewerService: ViewerStateService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.route.data.subscribe(
      (data: Data) => {
        this.fileReportsPage = data['fileReportsPage'];
        this.batchReport = data['batchReport'];
        console.log(this.batchReport);
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
