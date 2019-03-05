import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ConfigurationsService } from '../../configurations.service';
import { ConfirmationService } from 'primeng/api';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { FileNameRulesPage } from 'src/app/shared/model/file-name-rules.model';
import { Util } from 'src/app/shared/util';
import { Subscription } from 'rxjs';
import { FileNameRule } from 'src/app/shared/model/file-name-rule.model';
import { ResolvedData } from 'src/app/shared/model/resolved-data.model';
import { ErrorService } from 'src/app/shared/services/error.service';

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
    private confirmationService: ConfirmationService,
    private errorService: ErrorService) { }

  resolveCamelCase = Util.unCamelCase;

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        let resolved: ResolvedData<FileNameRulesPage> = data['fileNameRulesPage'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }
        this.nameRulesPage = resolved.data;
      }
    );

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
        this.configService.listItemDeleted.next();
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
