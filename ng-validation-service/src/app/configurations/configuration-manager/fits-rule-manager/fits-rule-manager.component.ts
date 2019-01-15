import { Component, OnInit, OnDestroy } from '@angular/core';
import { FitsResultRulesPage } from 'src/app/shared/model/fits-result-rules.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { ConfigurationsService } from '../../configurations.service';
import { ConfirmationService } from 'primeng/api';
import { FitsResultRule } from 'src/app/shared/model/fits.result-rule.model';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-fits-rule-manager',
  templateUrl: './fits-rule-manager.component.html',
  styleUrls: ['./fits-rule-manager.component.css']
})
export class FitsRuleManagerComponent implements OnInit, OnDestroy {

  fitsRulesPage: FitsResultRulesPage;

  fitsRuleChangedSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigurationsService,
    private confirmationService: ConfirmationService) { }

  resolveCamelCase = Util.unCamelCase;

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.fitsRulesPage = data['fitsResultRulesPage'];
      }
    );

    this.fitsRuleChangedSubscription = this.configService.fitsResultRulesUpdated.subscribe(
      () => {
        this.configService
          .getFitsResultRulesPage(Util.getHrefForRel(this.fitsRulesPage, "self"))
          .subscribe((page: FitsResultRulesPage) => {
            this.fitsRulesPage = page;
          });
      }
    );

  }

  ngOnDestroy(): void {
    this.fitsRuleChangedSubscription.unsubscribe();
  }

    /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.configService
      .getFitsResultRulesPage(url)
      .subscribe((page: FitsResultRulesPage) => {
        this.fitsRulesPage = page;
      });
  }

  onDeleteRule(rule: FitsResultRule) {
    // this.configService.deleteFileNameRule(rule).subscribe(
    //   (data) => {
    //     this.refreshConfigList();
    //     this.router.navigate(['../namerules'], {relativeTo: this.route});
    //   },

    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  refreshConfigList() {
    this.configService.refetchFitsResultRulesPage(this.fitsRulesPage).subscribe(
      (page) => {
        this.fitsRulesPage = page;
      },
      (error) => {
        console.log(error);
      }
    );
  }


}
