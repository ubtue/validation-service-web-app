import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationsService } from '../configurations.service';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-configuration-manager',
  templateUrl: './configuration-manager.component.html',
  styleUrls: ['./configuration-manager.component.css']
})
export class ConfigurationManagerComponent implements OnInit, OnDestroy {

  config: Configuration;
  constructor(private configService: ConfigurationsService) { }
  configSubscription: Subscription;

  ngOnInit() {
    this.configSubscription = this.configService.configLoaded.subscribe(
      (config: Configuration) => {
        this.config = config;
      }
    );
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

}
