import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Batch } from 'src/app/shared/model/batch.model';
import { BatchesService } from 'src/app/batches/batches.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { Resolved } from 'src/app/shared/model/resolved.model';

@Component({
  selector: 'app-batch-manager',
  templateUrl: './batch-manager.component.html',
  styleUrls: ['./batch-manager.component.css']
})
export class BatchManagerComponent implements OnInit {


  // constructor(private route: ActivatedRoute, private batchesService: BatchesService, private router: Router, private errorService: ErrorService) { }

  ngOnInit() {
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     let resolvedBatch:ResolvedData<Batch> = data['batch'];
    //     console.log('visited');
    //     if(!resolvedBatch.data) {
    //       console.log('visited');
    //       this.errorService.resolved = resolvedBatch;
    //       this.router.navigate(['/errors']);
    //     }
    //   }
    // );
  }

}
