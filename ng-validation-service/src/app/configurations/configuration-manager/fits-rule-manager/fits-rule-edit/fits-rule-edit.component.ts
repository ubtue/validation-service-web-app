import { Component, OnInit, ViewChild } from '@angular/core';
import { FitsResultRule } from 'src/app/shared/model/fits.result-rule.model';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { ConfigurationsService } from 'src/app/configurations/configurations.service';
import { Observable, Observer } from 'rxjs';
import { Util } from 'src/app/shared/util';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fits-rule-edit',
  templateUrl: './fits-rule-edit.component.html',
  styleUrls: ['./fits-rule-edit.component.css']
})
export class FitsRuleEditComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  rule: FitsResultRule;
  ruleCopy: FitsResultRule;
  ruleTypes: SelectItem[];
  toolTypes: SelectItem[];
  outcomeTypes: SelectItem[];

  configuration: Configuration;

  creationMode = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigurationsService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    // Resolve rule
    this.route.data.subscribe(
      (data: Data) => {
        if (data['fitsResultRule']) {
          this.rule = data['fitsResultRule'];
        } else {
          this.rule = new FitsResultRule();
          this.rule.outcome = 'valid';
          this.rule.type = 'matchesRegularExpression';
          this.rule.errorMessage = '';
          this.creationMode = true;
          this.rule.outcomeOnMissingFitsRecord = 'valid';
        }

        this.ruleCopy = <FitsResultRule>Util.deepCopy(this.rule);
        console.log(this.rule);
      }
    )

    // Fetch configuration. Needed for creation mode.
    this.route.parent.parent.data.subscribe(
      (data: Data) => {
        this.configuration = data['configuration'];
      }
    );

    // Initialize dropdowns
    this.ruleTypes = [
      {label: 'If file is not valid', value: 'fileValid'},
      {label: 'If file with puid is not valid', value: 'puidValid'},
      {label: 'If file with mime type is not valid', value: 'mimeValid'},
      {label: 'If file with mime type doesn\'t have file extension', value: 'mimeExtension'},
    ];

    this.outcomeTypes = [
      {label: 'Valid', value: 'valid'},
      {label: 'Not valid', value: 'notValid'}
    ];

    this.toolTypes = [
      {label: 'Any', value: null},
      {label: 'MediaInfo', value: 'MediaInfo'},
      {label: 'OIS Audio Information', value: 'OIS Audio Information'},
      {label: 'ADL Tool', value: 'ADL Tool'},
      {label: 'VTT Tool', value: 'VTT Tool'},
      {label: 'Droid', value: 'Droid'},
      {label: 'Jhove', value: 'Jhove'},
      {label: 'file utility', value: 'file utility'},
      {label: 'Exiftool', value: 'Exiftool'},
      {label: 'NLNZ Metadata Extracto', value: 'NLNZ Metadata Extracto'},
      {label: 'OIS File Information', value: 'OIS File Information'},
      {label: 'OIS XML Metadata', value: 'OIS XML Metadata'},
      {label: 'ffident', value: 'ffident'},
      {label: 'Tika', value: 'Tika'},
    ]

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
      // regEx: this.rule.value,
      types: this.rule.type,
      outcome: this.rule.outcome,
      dspace: this.rule.errorMessage
    });
  }

  onSave() {

    if (this.creationMode) {
      this.configService.createFitsResultRule(this.ruleCopy, this.configuration).subscribe(
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
      this.configService.updateFitsResultRule(this.ruleCopy).subscribe(
        (result) => {
          this.rule = <FitsResultRule>Util.deepCopy(this.ruleCopy);
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
