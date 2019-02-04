import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FileReport } from 'src/app/shared/model/file-report.model';
import { SelectItem, Message } from 'primeng/api';
import { ChecksPage } from 'src/app/shared/model/checks.model';
import { ReportsService } from '../../reports.service';
import { Util } from 'src/app/shared/util';
import { ActivatedRoute, Data } from '@angular/router';
import { ViewerStateService } from '../viewer-state.service';

@Component({
  selector: 'app-file-report-viewer',
  templateUrl: './file-report-viewer.component.html',
  styleUrls: ['./file-report-viewer.component.css']
})
export class FileReportViewerComponent implements OnInit {

  fileReport: FileReport;
  errorMessages: Message[] = [];

  displayIndex = 0;

  options: SelectItem[];
  option: string;

  failedCount = 0;

  checksPage: ChecksPage;

  constructor(private reportsService: ReportsService, private route: ActivatedRoute, private viewerService: ViewerStateService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.fileReport = data['fileReport'];
        this.viewerService.selectedFileReport.next(this.fileReport);
        for (const errorMessage of this.fileReport.errorMessages) {
          console.log(this.fileReport);
          let message: Message = {severity: 'error',summary:'Error:',detail:errorMessage,closable:false,sticky:true}
          this.errorMessages.push(message);
        }
      }
    )

    this.failedCount = this.fileReport.failedFitsChecks + this.fileReport.failedNameChecks + (this.fileReport._embedded['verapdf-result'] ? this.fileReport._embedded['verapdf-result'].failedPolicyChecks : 0);
    this.options = [
      {label: 'All (' + this.failedCount + ')', value :'all', disabled: this.failedCount == 0},
      {label: 'File Name Checks (' + this.fileReport.failedNameChecks + ')', value :'name', disabled: this.fileReport.failedNameChecks == 0},
      {label: 'Fits Result Checks (' + this.fileReport.failedFitsChecks + ')', value :'fits', disabled: this.fileReport.failedFitsChecks == 0},
      {label: 'VeraPDF Policy (' + (this.fileReport._embedded['verapdf-result'] ? this.fileReport._embedded['verapdf-result'].failedPolicyChecks : 0) + ')',
        value :'verapdf', disabled: !this.fileReport._embedded['verapdf-result'] || this.fileReport._embedded['verapdf-result'] && this.fileReport._embedded['verapdf-result'].failedPolicyChecks == 0}
    ]

    if(this.failedCount > 0) {
      this.reportsService.getChecksPage(Util.getHrefForRel(this.fileReport, 'checks')).subscribe(
        (checksPage: ChecksPage) => {
          this.checksPage = checksPage;
        },
        (error) => {
          console.log(error);
        }

      );
    }
  }


  onChangeCheckTypeFilter() {
    console.log('called');
    this.reportsService.getChecksPage(Util.getHrefForRel(this.fileReport, 'checks'), this.option).subscribe(
      (checksPage: ChecksPage) => {
        this.checksPage = checksPage;
      },
      (error) => {
        console.log(error);
      }

    );
  }

    /**
  * Load new page as triggered by paginator
  * @param url the url of the page to load
  */
  onLoadChecksPage(url: string) {
    console.log(url)
    this.reportsService
      .getChecksPage(url)
      .subscribe(
        (page: ChecksPage) => {
          this.checksPage = page;
        });
  }


}
