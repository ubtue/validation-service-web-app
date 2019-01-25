import { Component, OnInit } from '@angular/core';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';
import { ActivatedRoute, Data } from '@angular/router';
import { BatchReportResolver } from './batch-report-resolver.service';
import { BatchReport } from 'src/app/shared/model/batch-report.model';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit {

  fileReportsPage: FileReportsPage;
  batchReport: BatchReport;
  resolveCamelCase = Util.unCamelCase;
  showingFileReport = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.fileReportsPage = data['fileReportsPage'];
        console.log(this.fileReportsPage);
      }
    );

    this.route.data.subscribe(
      (data: Data) => {
        this.batchReport = data['batchReport'];
        console.log(this.batchReport);
      }
    );
  }

}
