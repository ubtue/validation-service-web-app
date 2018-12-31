import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Batch} from '../../shared/model/batch.model'
import { BatchesService } from '../batches.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-batch-define',
  templateUrl: './batch-define.component.html',
  styleUrls: ['./batch-define.component.css']
})
export class BatchDefineComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  constructor(private batchesService: BatchesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  OnSave() {
    let batch: Batch = new Batch();
    batch.description = this.form.value.name;
    this.batchesService.createBatch(batch).subscribe(
      (batch: Batch) => {
        this.batchesService.resetListRequested.next();
        this.router.navigate(['../', batch.id], {relativeTo: this.route});
      }
    )
  }

  onAbort() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }



}
