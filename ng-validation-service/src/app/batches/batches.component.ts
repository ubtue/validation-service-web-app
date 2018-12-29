import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { BatchPage } from '../shared/model/batches.model';
import { BatchesService } from './batches.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';



@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit, OnDestroy {

  pageChangedSubscription: Subscription;

  page: BatchPage;

  constructor(private batchesService: BatchesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(
      (data: Data) => {
        this.page = data['startPage']
      }
    )

    // this.batchesService.getBatchesStartPage().subscribe(
    //   (page: BatchPage) => {
    //     this.page = page;
    //     console.log('fetched!');
    //   }
    // )

    // this.pageChangedSubscription = this.batchesService.pageChanged.subscribe(
    //   (page: BatchPage) => {
    //     this.page = page;
    //   }
    // )

  }

  ngOnDestroy() {
    this.pageChangedSubscription.unsubscribe();
  }

}
