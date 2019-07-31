import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Batch} from '../../shared/model/batch.model';
import { BatchesService } from '../batches.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-batch-define',
  templateUrl: './batch-define.component.html',
  styleUrls: ['./batch-define.component.css']
})
export class BatchDefineComponent implements OnInit {

  @ViewChild('form', { static: false }) form: NgForm;

  constructor(private batchesService: BatchesService,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService) { }

  ngOnInit() {}

  OnSave() {
    const batch: Batch = new Batch();
    batch.description = this.form.value.name;
    this.batchesService.createBatch(batch).subscribe(
      (batch: Batch) => {
        this.batchesService.resetBatchListRequested.next();
        this.router.navigate(['../', batch.id], {relativeTo: this.route});
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Batch could not be created', error);
      }
    );
  }

  onAbort() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }



}
