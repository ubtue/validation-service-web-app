import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ApplicationSettings } from '../shared/model/settings.model';
import { Util } from '../shared/util';
import { NgForm } from '@angular/forms';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: ApplicationSettings;
  settingsCopy: ApplicationSettings;

  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute, private settingsService: SettingsService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.settings = data['settings'];
        this.settingsCopy = <ApplicationSettings>Util.deepCopy(this.settings);
      }
    );
  }

  onSave() {
    this.settingsService.updateSettings(this.settingsCopy).subscribe(
      (result) => {
        this.settings = <ApplicationSettings>Util.deepCopy(this.settingsCopy);
        this.onCancel();
      },

      (error) => {
        console.log(error);
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
