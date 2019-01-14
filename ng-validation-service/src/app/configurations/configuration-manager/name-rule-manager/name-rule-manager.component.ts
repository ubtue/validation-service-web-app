import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ConfigurationsService } from '../../configurations.service';
import { ConfirmationService } from 'primeng/api';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { FileNameRulesPage } from 'src/app/shared/model/file-name-rules.model';
import { Util } from 'src/app/shared/util';
import { Subscription } from 'rxjs';
import { FileNameRule } from 'src/app/shared/model/file-name-rule.model';

@Component({
  selector: 'app-name-rule-manager',
  templateUrl: './name-rule-manager.component.html',
  styleUrls: ['./name-rule-manager.component.css']
})
export class NameRuleManagerComponent implements OnInit, OnDestroy {


  nameRulesPage: FileNameRulesPage;

  nameRuleChangedSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigurationsService,
    private confirmationService: ConfirmationService) { }

  resolveCamelCase = Util.unCamelCase;

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.nameRulesPage = data['fileNameRulesPage'];
      }
    )

    this.nameRuleChangedSubscription = this.configService.fileNameRulesUpdated.subscribe(
      () => {
        this.configService
          .getFileNameRulesPage(Util.getHrefForRel(this.nameRulesPage, "self"))
          .subscribe((page: FileNameRulesPage) => {
            this.nameRulesPage = page;
          });
      }
    );

  }

  ngOnDestroy(): void {
    this.nameRuleChangedSubscription.unsubscribe();
  }

    /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.configService
      .getFileNameRulesPage(url)
      .subscribe((page: FileNameRulesPage) => {
        this.nameRulesPage = page;
      });
  }

  onDeleteRule(rule: FileNameRule) {
    this.configService.deleteFileNameRule(rule).subscribe(
      (data) => {
        this.refreshConfigList();
        this.router.navigate(['../namerules'], {relativeTo: this.route});
      },

      (error) => {
        console.log(error);
      }
    );
  }

  refreshConfigList() {
    this.configService.refetchFileNameRulesPage(this.nameRulesPage).subscribe(
      (page) => {
        this.nameRulesPage = page;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
