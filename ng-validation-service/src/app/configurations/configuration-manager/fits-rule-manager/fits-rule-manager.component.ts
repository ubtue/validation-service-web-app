import { Component, OnInit, OnDestroy } from '@angular/core';
import { FitsResultRulesPage } from 'src/app/shared/model/fits-result-rules.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { ConfigurationsService } from '../../configurations.service';
import { ConfirmationService } from 'primeng/api';
import { FitsResultRule } from 'src/app/shared/model/fits.result-rule.model';
import { Util } from 'src/app/shared/util';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';

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
    private confirmationService: ConfirmationService,
    private errorService: ErrorService) { }

  resolveCamelCase = Util.unCamelCase;

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        const resolved: Resolved<FitsResultRulesPage> = data['fitsResultRulesPage'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }
        this.fitsRulesPage = resolved.data;
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
    if (this.fitsRuleChangedSubscription) {
      this.fitsRuleChangedSubscription.unsubscribe();
    }
  }

    /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.configService
      .getFitsResultRulesPage(url)
      .subscribe(
        (page: FitsResultRulesPage) => {
          this.fitsRulesPage = page;
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to load rule list', error);
        }
      );
  }

  onDeleteRule(rule: FitsResultRule) {
    this.configService.deleteFitsResultRule(rule).subscribe(
      (data) => {
        this.configService.listItemDeleted.next();
        this.refreshConfigList();
        this.router.navigate(['../fitsrules'], {relativeTo: this.route});
      },
      (error) => {
        if (error.status === 404) {
          this.configService.listItemDeleted.next();
          this.refreshConfigList();
          this.router.navigate(['../fitsrules'], {relativeTo: this.route});
        } else {
          this.errorService.raiseGlobalErrorMessage('Failed to delete rule', error);
        }
      }
    );
  }

  refreshConfigList() {
    this.configService.refetchFitsResultRulesPage(this.fitsRulesPage).subscribe(
      (page) => {
        this.fitsRulesPage = page;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to load rule list', error);
      }
    );
  }


}
