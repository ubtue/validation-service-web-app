import { Component, OnInit, ViewChild } from '@angular/core';
import { VerapdfSetup } from 'src/app/shared/model/verapdf-setup.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Util } from 'src/app/shared/util';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { ConfigurationsService } from '../../configurations.service';
import { Observable, Observer } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-verapdf-setup-edit',
  templateUrl: './verapdf-setup-edit.component.html',
  styleUrls: ['./verapdf-setup-edit.component.css']
})
export class VerapdfSetupEditComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  veraSetup: VerapdfSetup;
  veraSetupCopy: VerapdfSetup;
  validationProfiles: SelectItem[];


  constructor(private route: ActivatedRoute,
              private router: Router,
              private configService: ConfigurationsService,
              private confirmationService: ConfirmationService,
              private errorService: ErrorService) { }

  ngOnInit() {

    this.route.parent.data.subscribe(
      (data: Data) => {
        let resolved: Resolved<Configuration> = data['configuration'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }
        this.veraSetup = resolved.data._embedded['verapdf-setup'];
        this.veraSetupCopy = Util.deepCopy(this.veraSetup);
      }
    );

    this.validationProfiles = [
      {label: 'Automatic', value: 'automatic'},
      {label: 'PDF/A-1a', value: '1a'},
      {label: 'PDF/A-1b', value: '1b'},
      {label: 'PDF/A-2a', value: '2a'},
      {label: 'PDF/A-2b', value: '2b'},
      {label: 'PDF/A-2u', value: '2u'},
      {label: 'PDF/A-3a', value: '3a'},
      {label: 'PDF/A-3b', value: '3b'},
      {label: 'PDF/A-3u', value: '3u'},
      {label: 'PDF/A-4', value: '4'},
    ];

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
    this.form.reset({

      profiles: this.veraSetup.validationProfile,
      threshold: this.veraSetup.failedChecksThreshold,
      checksPerRule: this.veraSetup.failedChecksPerRuleDisplayed,
      fail: this.veraSetup.failOnInvalidPdfA,
      trailerEncrypt: this.veraSetup.pdfPolicies.disallowEncryptInTrailer,
      otherEncrypt: this.veraSetup.pdfPolicies.disallowEncryption,
      fonts: this.veraSetup.pdfPolicies.disallowEmbeddedFonts,
      files: this.veraSetup.pdfPolicies.disallowEmbeddedFiles,
      attachments: this.veraSetup.pdfPolicies.disallowFileAttachments,
      multimedia: this.veraSetup.pdfPolicies.disallowMultimediaAnnotations,
      parsable: this.veraSetup.pdfPolicies.disallowNonParseableDocuments
    });
  }

  onSave() {
    this.configService.updateVerapdfSetup(this.veraSetupCopy).subscribe(
      (result) => {
        this.veraSetup = <VerapdfSetup>Util.deepCopy(this.veraSetupCopy);
        this.onCancel();
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to save configuration', error);
      }
    );
  }

}
