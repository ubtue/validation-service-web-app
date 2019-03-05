import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationsService } from '../configurations.service';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { Subscribable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuration-manager',
  templateUrl: './configuration-manager.component.html',
  styleUrls: ['./configuration-manager.component.css']
})
export class ConfigurationManagerComponent implements OnInit, OnDestroy {

  config: Configuration;
  constructor(private configService: ConfigurationsService, private route: ActivatedRoute) { }
  configSubscription: Subscription;

  ngOnInit() {
    this.config = this.route.snapshot.data['configuration'];
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
