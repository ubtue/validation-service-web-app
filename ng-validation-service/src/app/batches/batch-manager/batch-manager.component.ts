import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Batch } from 'src/app/shared/model/batch.model';
import { BatchesService } from 'src/app/batches/batches.service';

@Component({
  selector: 'app-batch-manager',
  templateUrl: './batch-manager.component.html',
  styleUrls: ['./batch-manager.component.css']
})
export class BatchManagerComponent implements OnInit {

  selectedBatch: Batch;

  constructor(private route: ActivatedRoute, private batchesService: BatchesService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.selectedBatch = data['batch'];
      }
    )
  }

  onDeleteBatch() {
    this.batchesService.deleteBatch(this.selectedBatch).subscribe(
      (success) =>{
        this.batchesService.listReloadRequested.next();
        this.router.navigate(["../../"],{relativeTo: this.route})
      },

      (error) => {

      }

    )
  }

}
