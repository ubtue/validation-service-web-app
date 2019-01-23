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
    private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.configurationsPage = data["startPage"];
      // this.messages = [];
    });

    this.route.parent.data.subscribe(
      (data: Data) => {
        this.selectedBatch = data['batch'];
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
        console.log('success');
        this.router.navigate(["/reports"]);
      },
      (error) => {
        console.log(error);
      }

    );

  }


}