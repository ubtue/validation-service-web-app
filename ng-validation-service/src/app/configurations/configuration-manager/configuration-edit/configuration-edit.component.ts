import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { NgForm } from '@angular/forms';
import { Util } from 'src/app/shared/util';
import { ThrowStmt } from '@angular/compiler';
import { ConfigurationsService } from '../../configurations.service';
import { retry } from 'rxjs/operators';
import { Subject, Observable, Observer } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-configuration-edit',
  templateUrl: './configuration-edit.component.html',
  styleUrls: ['./configuration-edit.component.css']
})
export class ConfigurationEditComponent implements OnInit, CanDeactivateGuard {

  @ViewChild('form') form: NgForm;

  selectedConfiguration: Configuration;
  configurationCopy: Configuration;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigurationsService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: Data) => {
        const resolved: Resolved<Configuration> = data['configuration'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }

        this.selectedConfiguration = resolved.data;
        this.configurationCopy = <Configuration>Util.deepCopy(this.selectedConfiguration);
        this.configService.configLoaded.next(this.configurationCopy);
      }
    );
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
      name: this.selectedConfiguration.description,
      fits: this.selectedConfiguration.fitsEnabled,
      execMode: this.selectedConfiguration._embedded['verapdf-setup'].executionMode,
      fitsTimeOut: this.selectedConfiguration.fitsTimeOut,
      veraTimeOut: this.selectedConfiguration.veraPdfTimeOut,
      veraMaxHeap: this.selectedConfiguration.veraPdfMaxHeapSize,
      publicIdentifier: this.selectedConfiguration.publicIdentifier
    });
  }

  onSave() {
    this.configService.updateConfiguration(this.configurationCopy).subscribe(
      (result) => {
        this.selectedConfiguration = <Configuration>Util.deepCopy(this.configurationCopy);
        this.onCancel();
        this.configService.configLoaded.next(this.configurationCopy);
      },

      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to save changes', error);
      }
    );
  }



}
