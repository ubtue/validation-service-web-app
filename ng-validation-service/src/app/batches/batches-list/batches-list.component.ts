import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BatchPage } from 'src/app/shared/model/batches.model';
import { BatchesService } from '../batches.service';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, mergeMap, map } from 'rxjs/operators';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-batches-list',
  templateUrl: './batches-list.component.html',
  styleUrls: ['./batches-list.component.css']
})
export class BatchesListComponent implements OnInit {

  // the displayed page
  page: BatchPage;

  // subscriptions and subjects
  searchTextSubscription: Subscription;
  listReloadRequestedSubscription: Subscription;
  resetListRequestedSubscription: Subscription;
  searchTextChanged = new Subject<string>();

  // ordering and filtering
  descendingSortOrder: boolean = true;
  descriptionFilter: string = "";
  
  @ViewChild('filter') filterInput: ElementRef;

  constructor(private batchesService: BatchesService, private route: ActivatedRoute) { }

  ngOnInit() {
    // fetch result from resolver
    this.route.data.subscribe(
      (data: Data) => {
        this.page = data['startPage']
      }
    )

    // handle search text input
    this.searchTextSubscription = this.searchTextChanged.pipe(debounceTime(400), distinctUntilChanged()).subscribe(
      (filter) => {
        this.descriptionFilter = filter;
        this.batchesService.getBatchesPage(this.batchesService.batchesResourceUrl, this.descendingSortOrder, this.descriptionFilter).subscribe(
          (page: BatchPage) => {
            this.page = page;
          }
        )
      }
    )

    // handle refresh list requests (e.g. on deletion)
    this.listReloadRequestedSubscription = this.batchesService.listReloadRequested.subscribe(
      () => {
        this.batchesService.getBatchesPage(Util.getHrefForRel(this.page, 'self')).subscribe(
          (page: BatchPage) => {
            this.page = page;
          }
        )
      }
    )

    // reset interface and go to start page (on create batch)
    this.resetListRequestedSubscription = this.batchesService.resetListRequested.subscribe(
      () => {
        this.batchesService.getBatchesStartPage().subscribe(
          (page: BatchPage) => {
            this.page = page;
            this.descriptionFilter = '';
            this.filterInput.nativeElement.value = '';
            this.descendingSortOrder = true;
          }
        )
      }
    )

  }

  /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.batchesService.getBatchesPage(url).subscribe(
      (page: BatchPage) => {
        this.page = page;
      }
    )
  }

  /**
   * Handles changing sort order
   * @param descendingOrder 
   */
  onChangeSortOrder(descendingOrder: boolean) {
    this.descendingSortOrder = descendingOrder;
    this.batchesService.getBatchesPage(this.batchesService.batchesResourceUrl, this.descendingSortOrder, this.descriptionFilter).subscribe(
      (page: BatchPage) => {
        this.page = page;
      }
    )
  }


  ngOnDestroy() {
    this.searchTextSubscription.unsubscribe();
    this.listReloadRequestedSubscription.unsubscribe();
    this.resetListRequestedSubscription.unsubscribe();
  }

}
