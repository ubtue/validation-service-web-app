import { Component, OnInit, Input } from '@angular/core';
import { FileReport } from 'src/app/shared/model/file-report.model';

@Component({
  selector: 'app-file-report-viewer',
  templateUrl: './file-report-viewer.component.html',
  styleUrls: ['./file-report-viewer.component.css']
})
export class FileReportViewerComponent implements OnInit {

  @Input() fileReport: FileReport;

  displayIndex = 0;

  constructor() { }

  ngOnInit() {
  }

}
