import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';
import { Util } from 'src/app/shared/util';
import { ReportsService } from '../../reports.service';
import { Subject } from 'rxjs';
import { FileReport } from 'src/app/shared/model/file-report.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-file-reports-list',
  templateUrl: './file-reports-list.component.html',
  styleUrls: ['./file-reports-list.component.css']
})
export class FileReportsListComponent implements OnInit {

  @Input()fileReportsPage: FileReportsPage;

  @Output()fileSelected: Subject<FileReport> = new Subject<FileReport>();

  resolveCamelCase = Util.unCamelCase;

  constructor(private route: ActivatedRoute,
    private reportsService: ReportsService,
    private errorService: ErrorService) { }

  ngOnInit() {

  }

  /**
  * Load new page as triggered by paginator
  * @param url the url of the page to load
  */
  onLoadFileReportsPage(url: string) {
    this.reportsService
      .getFileReportsPage(url)
      .subscribe(
        (page: FileReportsPage) => {
          this.fileReportsPage = page;
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to load file reports', error);
        }
      );
  }


}
