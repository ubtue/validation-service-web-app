import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { BatchReportsPage } from 'src/app/shared/model/batch-reports.model';
import { QueuePage } from 'src/app/shared/model/queue-order.model';
import { ReportsService } from '../reports.service';
import { Util } from 'src/app/shared/util';
import { BatchReport } from 'src/app/shared/model/batch-report.model';

@Component({
  selector: 'app-reports-overview',
  templateUrl: './reports-overview.component.html',
  styleUrls: ['./reports-overview.component.css']
})
export class ReportsOverviewComponent implements OnInit, OnDestroy {

  finishedReportsPage: BatchReportsPage;
  queuePage: QueuePage;
  refreshInterval: any;
  showCompleted = true;

  hrefToRel = Util.getHrefForRel;
  resolveCamelCase = Util.unCamelCase;

  constructor(private route: ActivatedRoute, private reportsServcie: ReportsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.finishedReportsPage = data["reportsPage"];
      this.queuePage = data["queuePage"];

      this.refreshInterval = setInterval(
        () => {
          this.refreshData();
        }, 1500);
    });

    this.route.queryParams.subscribe(params => {
        if(params['active']) {
          this.showCompleted = !params['active'];
        }
      });
  }

  ngOnDestroy() {
    clearInterval(this.refreshInterval);
  }

  refreshData() {
    this.reportsServcie.getQueuePage(Util.getHrefForRel(this.queuePage, 'self')).subscribe(
      (page: QueuePage) => {
        this.queuePage = page;
      },
      (error) => {
        console.log(error);
      }
    );

    this.reportsServcie.getReportsPage(Util.getHrefForRel(this.finishedReportsPage, 'self')).subscribe(
      (page: BatchReportsPage) => {
        this.finishedReportsPage = page;
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
  onLoadQueuePage(url: string) {
    this.reportsServcie
      .getQueuePage(url)
      .subscribe((page: QueuePage) => {
        this.queuePage = page;
      });
  }

  /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadReportsPage(url: string) {
    this.reportsServcie
      .getReportsPage(url)
      .subscribe(
        (page: BatchReportsPage) => {
          this.finishedReportsPage = page;
        });
  }

  onAbortOrder(order) {
    this.reportsServcie.deleteOrder(order).subscribe(
      () => {
        this.refreshData();
      }
    );
  }

  deleteReport(report: BatchReport) {
    console.log(report);
    this.reportsServcie.deleteBatchReport(report).subscribe(
      () => {
        this.refreshData();
      }
    );
  }

}
