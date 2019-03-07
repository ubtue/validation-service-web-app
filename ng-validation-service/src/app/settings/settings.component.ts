import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ApplicationSettings, MessageTranslation } from '../shared/model/settings.model';
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
  showTranslations = false;

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
    console.log(this.settingsCopy);
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
    let resetValues = {
      parallelTasks: this.settings.parallelTasks,
      threadsPerTask: this.settings.threadsPerTask,
      pageSize: this.settings.pageSize,
    };

    // Reset translation messages
    const messageTranslations: MessageTranslation = this.settings.messageTranslations;
    for (let key of Object.keys(messageTranslations)) {
      for (let key2 of Object.keys(messageTranslations[key]) ) {
        resetValues[key + key2] = messageTranslations[key][key2];
      }
    }
    this.form.reset(resetValues);
  }

  /**
   * Resolve headings from MessageTranslation var keys.
   * @param key the key of MessageTranslation member
   */
  resolveHeading(key:string) {
    switch (key) {
      case 'trailerEncryptTranslations':
        return 'Encypt keyword found in trailer dictionary';
        break;
      case 'encryptTranslations':
        return 'Encypted PDF document detected';
        break;
      case 'fontsTranslations':
        return 'Non embedded font detected';
        break;
      case 'multimediaTranslations':
        return 'Multimedia annotation detected';
        break;
      case 'attachmentsTranslations':
        return 'File attachments detected';
        break;
      case 'filesTranslations':
        return 'Document contains embedded files';
        break;
      case 'pdfATranslations':
        return 'Document is no valid PDF/A';
        break;
      case 'pdfAEncryptedTranslations':
        return 'Document is no valid PDF/A (Encryption)';
        break;
      default:
        return 'Unknown';
        break;
    }
  }

  // TrackBy functions for translations

  trackByFn(index: any, item: any) {
    return index;
 }
  trackByFn2(index: any, item: any) {
    return index;
 }

}
