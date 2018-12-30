import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Batch } from 'src/app/shared/model/batch.model';

@Component({
  selector: 'app-batch-manager',
  templateUrl: './batch-manager.component.html',
  styleUrls: ['./batch-manager.component.css']
})
export class BatchManagerComponent implements OnInit {

  selectedBatch: Batch;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.selectedBatch = data['batch'];
      }
    )
  }

}
