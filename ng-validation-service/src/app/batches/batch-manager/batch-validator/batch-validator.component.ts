import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/api';
import { ConfigurationsListComponent } from 'src/app/configurations/configurations-list/configurations-list.component';
import { ConfigSelectorComponent } from './config-selector/config-selector.component';
import { Data, ActivatedRoute, Router } from '@angular/router';
import { ConfigurationsPage } from 'src/app/shared/model/configurations.model';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { BatchesService } from '../../batches.service';
import { Batch } from 'src/app/shared/model/batch.model';
import { BatchValidationOrder } from 'src/app/shared/model/batch-validation-order.model';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-batch-validator',
  templateUrl: './batch-validator.component.html',
  styleUrls: ['./batch-validator.component.css'],
  providers: [DialogService]
})
export class BatchValidatorComponent implements OnInit {

  configurationsPage: ConfigurationsPage;
  selecetedConfiguration: Configuration;
  configurationDescription = "";
  selectedBatch: Batch;

  constructor(public dialogService: DialogService,
    private route: ActivatedRoute,
    private batchesService: BatchesService,
    private router: Router,
    private errorService: ErrorService) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      let resolved: Resolved<ConfigurationsPage> = data["startPage"];
      if (!resolved.data) {
        this.errorService.resolved = resolved;
        this.router.navigate(['/error']);
      }
      this.configurationsPage = resolved.data;
    });

    this.route.parent.data.subscribe(
      (data: Data) => {
        const resolved: Resolved<Batch> = data['batch'];

        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }

        this.selectedBatch = resolved.data;
        // this.messages = [];
      }
    );
  }

  onShowConfigurationOverlay() {
    const ref = this.dialogService.open(ConfigSelectorComponent, {
      data: {
        startPage: this.configurationsPage
      },
      header: 'Choose a Configuration',
      width: '70%'
    });

    ref.onClose.subscribe((config: Configuration) => {
      if (config) {
          this.selecetedConfiguration = config;
          this.configurationDescription = config.description;
          console.log(config);
      }
     });
  }

  onCreateValidationOrder() {
    const validationOrder = new BatchValidationOrder();
    validationOrder.batchId = this.selectedBatch.id;
    validationOrder.configurationId = this.selecetedConfiguration.id;
    this.batchesService.submitValidationOrder(validationOrder).subscribe(
      () => {
        this.router.navigate(["/reports"],{queryParams: {active: true}});
      },
      (error) => {
        console.log(error);
      }

    );

  }


}
