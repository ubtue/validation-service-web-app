import { Component, OnInit } from '@angular/core';
import { BatchPage } from 'src/app/shared/model/batches.model';
import { BatchesService } from '../batches.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-batches-list',
  templateUrl: './batches-list.component.html',
  styleUrls: ['./batches-list.component.css']
})
export class BatchesListComponent implements OnInit {

  pageChangedSubscription: Subscription;

  page: BatchPage = {_embedded: null, _links:null};

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

  loadPage(url: string) {
    this.batchesService.getBatchesPage(url).subscribe(
      (page: BatchPage) => {
        this.page = page;
      }
    )
  }

  ngOnDestroy() {
    this.pageChangedSubscription.unsubscribe();
  }

}
