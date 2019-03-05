import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ApplicationSettings } from '../shared/model/settings.model';
import { Util } from '../shared/util';
import { NgForm } from '@angular/forms';
import { SettingsService } from './settings.service';
import { ConfirmationService } from 'primeng/api';
import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';
import { Observable, Observer } from 'rxjs';
import { Resolved } from '../shared/model/resolved.model';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, CanDeactivateGuard {

  settings: ApplicationSettings;
  settingsCopy: ApplicationSettings;

  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute,
    private settingsService: SettingsService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        const resolved: Resolved<ApplicationSettings> = data['settings'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }

        this.settings = resolved.data;
        this.settingsCopy = <ApplicationSettings>Util.deepCopy(this.settings);
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

  onSave() {
    this.settingsService.updateSettings(this.settingsCopy).subscribe(
      (result) => {
        this.settings = <ApplicationSettings>Util.deepCopy(this.settingsCopy);
        this.onCancel();
      },

      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to save changes', error);
      }
    );
  }

  onCancel() {
    this.form.reset({
      parallelTasks: this.settings.parallelTasks,
      threadsPerTask: this.settings.threadsPerTask,
      pageSize: this.settings.pageSize,
    });
  }

}
