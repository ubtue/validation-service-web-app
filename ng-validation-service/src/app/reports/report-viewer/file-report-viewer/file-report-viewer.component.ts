import { Component, OnInit, Input, ChangeDetectorRef, LOCALE_ID, Inject } from '@angular/core';
import { FileReport } from 'src/app/shared/model/file-report.model';
import { SelectItem, Message } from 'primeng/api';
import { ChecksPage } from 'src/app/shared/model/checks.model';
import { ReportsService } from '../../reports.service';
import { Util } from 'src/app/shared/util';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ViewerStateService } from '../viewer-state.service';
import { AssertionsPage } from 'src/app/shared/model/verapdf-assertion.model';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-file-report-viewer',
  templateUrl: './file-report-viewer.component.html',
  styleUrls: ['./file-report-viewer.component.css']
})
export class FileReportViewerComponent implements OnInit {

  fileReport: FileReport;
  checksPage: ChecksPage;
  assertionsPage: AssertionsPage;
  errorMessages: Message[] = [];
  verapdfErrorMessages: Message[] = [];
  options: SelectItem[];
  option: string;
  assertionIndex = 0;
  displayIndex = 0;
  failedCount = 0;
  resolveCamelCase = Util.unCamelCase;

  constructor(private reportsService: ReportsService,
    private route: ActivatedRoute,
    private viewerService: ViewerStateService,
    private router: Router,
    private errorService: ErrorService,
    @Inject(LOCALE_ID) protected localeId: string) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        const resolved: Resolved<FileReport> = data['fileReport'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }

        this.fileReport = resolved.data;
        this.viewerService.selectedFileReport.next(this.fileReport);
        for (const errorMessage of this.fileReport.errorMessages) {
          let message: Message = { severity: 'error', summary: 'Error:', detail: errorMessage, closable: false, sticky: true };
          this.errorMessages.push(message);
        }

        let verapdfResult = this.fileReport._embedded['verapdf-result'];

        if (verapdfResult && verapdfResult.errorMessage) {
          this.verapdfErrorMessages.push({
            severity: 'warn',
            summary: 'VeraPDF: ',
            detail: this.fileReport._embedded['verapdf-result'].errorMessage,
            closable: false, sticky: true
          });
        }

      }
    );

    this.failedCount = this.fileReport.failedFitsChecks + this.fileReport.failedNameChecks + (this.fileReport._embedded['verapdf-result'] ? this.fileReport._embedded['verapdf-result'].failedPolicyChecks : 0);
    this.options = [
      {label: 'All (' + this.failedCount + ')', value :'all', disabled: this.failedCount == 0},
      {label: 'File Name Checks (' + this.fileReport.failedNameChecks + ')', value :'name', disabled: this.fileReport.failedNameChecks == 0},
      {label: 'Fits Result Checks (' + this.fileReport.failedFitsChecks + ')', value :'fits', disabled: this.fileReport.failedFitsChecks == 0},
      {label: 'VeraPDF Policy (' + (this.fileReport._embedded['verapdf-result'] ? this.fileReport._embedded['verapdf-result'].failedPolicyChecks : 0) + ')',
        value :'verapdf', disabled: !this.fileReport._embedded['verapdf-result'] || this.fileReport._embedded['verapdf-result'] && this.fileReport._embedded['verapdf-result'].failedPolicyChecks == 0}
    ];

    if(this.failedCount > 0) {
      this.reportsService.getChecksPage(Util.getHrefForRel(this.fileReport, 'checks'), '', this.localeId).subscribe(
        (checksPage: ChecksPage) => {
          this.checksPage = checksPage;
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to load checks', error);
        }
      );
    }

    if (this.fileReport._embedded['verapdf-result']) {
      this.reportsService.getAssertionsStartPage(this.fileReport._embedded['verapdf-result']).subscribe(
        (page: AssertionsPage) => {
          this.assertionsPage = page;
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to load verapdf report', error);
        }
      );
    }

  }

  onChangeCheckTypeFilter() {
    this.reportsService.getChecksPage(Util.getHrefForRel(this.fileReport, 'checks'), this.option, this.localeId).subscribe(
      (checksPage: ChecksPage) => {
        this.checksPage = checksPage;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to load checks', error);
      }
    );
  }

  /**
  * Load new page as triggered by paginator
  * @param url the url of the page to load
  */
  onLoadChecksPage(url: string) {
    this.reportsService
      .getChecksPage(url)
      .subscribe(
        (page: ChecksPage) => {
          this.checksPage = page;
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to load checks', error);
        }
      );
  }

  /**
  * Load new page as triggered by paginator
  * @param url the url of the page to load
  */
  onLoadAssertionsPage(url: string) {
    this.reportsService
      .getAssertionsPage(url)
      .subscribe(
        (page: AssertionsPage) => {
          this.assertionsPage = page;
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to load verapdf result', error);
        }
      );
  }


}
