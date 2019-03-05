import { Component, OnInit, ViewChild } from '@angular/core';
import { FileNameRule } from 'src/app/shared/model/file-name-rule.model';
import {SelectItem, ConfirmationService} from 'primeng/api';
import { ActivatedRoute, Data, Router, ResolveData } from '@angular/router';
import { ConfigurationsService } from 'src/app/configurations/configurations.service';
import { NgForm } from '@angular/forms';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service';
import { Observable, Observer, Subscription } from 'rxjs';
import { Util } from 'src/app/shared/util';
import { FileNameRulesPage } from 'src/app/shared/model/file-name-rules.model';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ResolvedData } from 'src/app/shared/model/resolved-data.model';
import { ErrorService } from 'src/app/shared/services/error.service';


@Component({
  selector: 'app-name-rule-edit',
  templateUrl: './name-rule-edit.component.html',
  styleUrls: ['./name-rule-edit.component.css']
})
export class NameRuleEditComponent implements OnInit, CanDeactivateGuard {

  @ViewChild('form') form: NgForm;

  rule: FileNameRule;
  ruleCopy: FileNameRule;
  ruleTypes: SelectItem[];
  outcomeTypes: SelectItem[];
  listItemDeletedSubscription = new Subscription();
  configuration: Configuration;

  creationMode = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigurationsService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService) { }

  ngOnInit() {

    // Resolve rule
    this.route.data.subscribe(
      (data: Data) => {

        const resolved: ResolvedData<FileNameRule> = data['fileNameRule'];

        if (resolved && !resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }

        if (resolved) {
          console.log('is resolved');
          this.rule = resolved.data;
        } else {
          console.log('is NOT resolved');
          this.rule = new FileNameRule();
          this.rule.outcome = 'valid';
          this.rule.type = 'matchesRegularExpression';
          this.creationMode = true;
          this.rule.errorMessage = '';
        }

        this.ruleCopy = <FileNameRule>Util.deepCopy(this.rule);
        console.log(this.rule);
      }
    )

    // Reset before delete to allow navigation
    this.listItemDeletedSubscription = this.configService.listItemDeleted.subscribe(
      () => {
        this.form.reset();
      }
    );

    // Fetch configuration. Needed for creation mode.
    this.route.parent.parent.data.subscribe(
      (data: Data) => {
        const resolved: ResolvedData<Configuration> = data['configuration'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }
        this.configuration = resolved.data;
      }
    );

    // Initialize dropdowns
    this.ruleTypes = [
      {label: 'If regular expression matches file name', value: 'matchesRegularExpression'},
      {label: 'If regular expression doesn\'t match file name', value: 'doesNotMatchRegularExpression'}
    ];

    this.outcomeTypes = [
      {label: 'Valid', value: 'valid'},
      {label: 'Not valid', value: 'notValid'}
    ];

  }


  ngOnDestroy() {
    this.listItemDeletedSubscription.unsubscribe();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create((observer: Observer<boolean>) => {
      if (this.form.pristine) {
        observer.next(true);
        observer.complete();
        return;
      }
      this.confirmationService.confirm({
        message: 'Discard changes?',
        accept: () => {
          observer.next(true);
          observer.complete();
        },
        reject: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  onCancel() {

    if (this.creationMode) {
      this.router.navigate(['../'], {relativeTo: this.route});
    }

    this.form.reset({
      name: this.rule.ruleName,
      regEx: this.rule.value,
      types: this.rule.type,
      outcome: this.rule.outcome,
      dspace: this.rule.errorMessage
    });
  }

  onSave() {

    if (this.creationMode) {
      this.configService.createFileNameRule(this.ruleCopy, this.configuration).subscribe(
        (result) => {
          this.rule = result;
          this.configService.fileNameRulesUpdated.next();
          this.form.reset();
          this.router.navigate(['../', this.rule.id], { relativeTo: this.route});
        },

        (error) => {
          console.log(error);
        }
      );
    } else {
      this.configService.updateFileNameRule(this.ruleCopy).subscribe(
        (result) => {
          this.rule = <FileNameRule>Util.deepCopy(this.ruleCopy);
          this.onCancel();
          this.configService.fileNameRulesUpdated.next();
        },

        (error) => {
          console.log(error);
        }
      );
    }





  }

  onDspaceErrorMessageChange(ev) {
    this.ruleCopy.errorMessage = ev.target.value;
  }



}


