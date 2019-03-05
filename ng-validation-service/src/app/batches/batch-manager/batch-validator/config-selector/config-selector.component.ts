import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { ConfigurationsPage } from 'src/app/shared/model/configurations.model';
import { Subscription, Subject } from 'rxjs';
import { ConfigurationsService } from 'src/app/configurations/configurations.service';

@Component({
  selector: 'app-config-selector',
  templateUrl: './config-selector.component.html',
  styleUrls: ['./config-selector.component.css']
})
export class ConfigSelectorComponent implements OnInit {

  configurationsPage: ConfigurationsPage;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private configurationsService: ConfigurationsService) { }

  ngOnInit() {
    this.configurationsPage = this.config.data.startPage;
  }

  onSelectConfig(config) {
    this.ref.close(config);
  }

  /**
  * Load new page as triggered by paginator
  * @param url the url of the page to load
  */
  onLoadPage(url: string) {
    this.configurationsService
      .getConfigurationsPage(url)
      .subscribe((page: ConfigurationsPage) => {
        this.configurationsPage = page;
      });
  }


}
