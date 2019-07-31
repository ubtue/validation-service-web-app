import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BatchPage } from 'src/app/shared/model/batches.model';
import { BatchesService } from '../batches.service';
import { ActivatedRoute, Data, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, mergeMap, map } from 'rxjs/operators';
import { Util } from 'src/app/shared/util';
import { Batch } from 'src/app/shared/model/batch.model';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-batches-list',
  templateUrl: './batches-list.component.html',
  styleUrls: ['./batches-list.component.css']
})
export class BatchesListComponent implements OnInit, OnDestroy {

  page: BatchPage;

  // subscriptions and subjects
  searchTextSubscription: Subscription;
  listReloadRequestedSubscription: Subscription;
  resetListRequestedSubscription: Subscription;
  searchTextChanged = new Subject<string>();
  // subscription for refreshing batches when user reclicks button in main nav
  navigationSubscription;

  // ordering and filtering
  descendingSortOrder: boolean = true;
  descriptionFilter: string = "";

  @ViewChild('filter', { static: false }) filterInput: ElementRef;

  constructor(private batchesService: BatchesService,
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService) { }

  ngOnInit() {
    // fetch result from resolver
    this.route.data.subscribe(
      (data: Data) => {
        let resolved: Resolved<BatchPage> = data['startPage'];
        if (resolved.data) {
          this.page = resolved.data;
        } else {
          this.errorService.resolved = resolved;
          this.router.navigate(['/error']);
        }
      }
    );

    // handle search text input
    this.searchTextSubscription = this.searchTextChanged.pipe(debounceTime(400), distinctUntilChanged()).subscribe(
      (filter) => {
        this.descriptionFilter = filter;
        this.batchesService.getBatchesPage(this.batchesService.batchesResourceUrl, this.descendingSortOrder, this.descriptionFilter).subscribe(
          (page: BatchPage) => {
            this.page = page;
          },
          (error) => {
            this.errorService.raiseGlobalErrorMessage('Loading of batches failed', error);
          }
        );
      }
    );

    // handle refresh list requests (e.g. on deletion)
    this.listReloadRequestedSubscription = this.batchesService.batchListReloadRequested.subscribe(
      () => {
        this.batchesService.getBatchesPage(Util.getHrefForRel(this.page, 'self')).subscribe(
          (page: BatchPage) => {
            this.page = page;
          },
          (error) => {
            this.errorService.raiseGlobalErrorMessage('Loading of batches failed', error);
          }
        );
      }
    );

    // reset interface and go to start page (on create batch)
    this.resetListRequestedSubscription = this.batchesService.resetBatchListRequested.subscribe(
      () => {
        this.batchesService.getBatchesStartPage().subscribe(
          (page: BatchPage) => {
            this.page = page;
            this.descriptionFilter = '';
            this.filterInput.nativeElement.value = '';
            this.descendingSortOrder = true;
          },
          (error) => {
            this.errorService.raiseGlobalErrorMessage('Loading of batches failed', error);
          }
        );
      }
    );

      // Reload page if user clicks on component link in the main menu while route is already active
      this.navigationSubscription = this.router.events.subscribe(
        (e: any) => {
          // If it is a NavigationEnd event re-initalise the component
          if (e instanceof NavigationEnd) {
            if ( e.url === ('/batches')) {
              this.loadStartPage();
            }
          }
        }
      );
  }

  /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.batchesService.getBatchesPage(url).subscribe(
      (page: BatchPage) => {
        this.page = page;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Loading of batches failed', error);
      }
    );
  }

  loadStartPage() {
    this.batchesService.getBatchesStartPage().subscribe(
      (page: BatchPage) => {
        this.page = page;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Loading of batches failed', error);
      }
    );
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
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Loading of batches failed', error);
      }
    );
  }

  onDeleteBatch(batch: Batch) {
    this.batchesService.deleteBatch(batch).subscribe(
      (success) =>{
        this.batchesService.batchListReloadRequested.next();
        this.router.navigate(["../"],{relativeTo: this.route});
      },
      (error) => {
        if (error.status === 404) {
          this.batchesService.batchListReloadRequested.next();
          this.router.navigate(["../"],{relativeTo: this.route});
        } else {
          this.errorService.raiseGlobalErrorMessage('Could not delete batch', error);
        }
      }
    );
  }

  ngOnDestroy() {
    this.searchTextSubscription.unsubscribe();
    this.listReloadRequestedSubscription.unsubscribe();
    this.resetListRequestedSubscription.unsubscribe();
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
