import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigurationsService } from '../configurations.service';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { Subscribable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import { Resolved } from 'src/app/shared/model/resolved.model';

@Component({
  selector: 'app-configuration-manager',
  templateUrl: './configuration-manager.component.html',
  styleUrls: ['./configuration-manager.component.css']
})
export class ConfigurationManagerComponent implements OnInit, OnDestroy {

  config: Configuration;
  configSubscription: Subscription;

  constructor(private configService: ConfigurationsService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    const resolved: Resolved<Configuration> = this.route.snapshot.data['configuration'];

    if (!resolved || !resolved.data) {
      this.errorService.resolved = resolved;
      this.router.navigate(['/error']);
    }
    this.config = resolved.data;
    this.configSubscription = this.configService.configLoaded.subscribe(
      (config: Configuration) => {
        this.config = config;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to load configuration', error);
      }
    );
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

}
