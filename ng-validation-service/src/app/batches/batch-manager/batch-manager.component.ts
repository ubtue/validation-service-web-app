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


  constructor(private route: ActivatedRoute, private batchesService: BatchesService, private router: Router) { }

  ngOnInit() {
    
  }

}
