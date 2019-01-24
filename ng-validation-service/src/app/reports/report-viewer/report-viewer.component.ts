import { Component, OnInit } from '@angular/core';
import { FileReportsPage } from 'src/app/shared/model/file-reports.model';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit {

  fileReportsPage: FileReportsPage;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.fileReportsPage = data['fileReportsPage'];
        console.log(this.fileReportsPage);
      }
    );
  }

}
