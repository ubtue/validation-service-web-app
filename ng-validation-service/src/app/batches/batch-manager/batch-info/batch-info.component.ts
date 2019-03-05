import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { BatchesService } from '../../batches.service';
import { Batch } from 'src/app/shared/model/batch.model';
import { ResolvedData } from 'src/app/shared/model/resolved-data.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-batch-info',
  templateUrl: './batch-info.component.html',
  styleUrls: ['./batch-info.component.css']
})
export class BatchInfoComponent implements OnInit {

  selectedBatch: Batch;

  constructor(private route: ActivatedRoute,
              private batchesService: BatchesService,
              private router: Router,
              private errorService: ErrorService) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: Data) => {
        let resolved: ResolvedData<Batch> = data['batch'];
        if (!resolved.data) {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }
        this.selectedBatch = resolved.data;;
      }
    );
  }

  onDeleteBatch() {
    this.batchesService.deleteBatch(this.selectedBatch).subscribe(
      (success) =>{
        this.batchesService.batchListReloadRequested.next();
        this.router.navigate(["../../"],{relativeTo: this.route});
      },

      (error) => {
        console.log(error);
      }
    );
  }

}
