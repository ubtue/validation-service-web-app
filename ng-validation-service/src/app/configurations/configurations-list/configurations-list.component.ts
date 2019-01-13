import { Component, OnInit, OnDestroy } from "@angular/core";
import { ConfigurationsPage } from "src/app/shared/model/configurations.model";
import { Message } from "src/app/shared/model/primeng-message.model";
import { Util } from "src/app/shared/util";
import { Subscription, Subject } from "rxjs";
import { ConfigurationsService } from "../configurations.service";
import { ConfirmationService } from "primeng/api";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';

@Component({
  selector: "app-configurations-list",
  templateUrl: "./configurations-list.component.html",
  styleUrls: ["./configurations-list.component.css"]
})
export class ConfigurationsListComponent implements OnInit, OnDestroy {

  configurationsPage: ConfigurationsPage;
  messages: Message[];
  hrefToRel = Util.getHrefForRel;
  searchTextSubscription: Subscription;
  searchTextChanged = new Subject<string>();
  descriptionFilter: string = "";
  listRefreshSubscription: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private configurationsService: ConfigurationsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.configurationsPage = data["startPage"];
      this.messages = [];
      console.log(this.configurationsPage);
    });

    // handle search text input
    this.searchTextSubscription = this.searchTextChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(filter => {
        this.descriptionFilter = filter;
        this.configurationsService
          .getConfigurationsPage(
            this.configurationsService.configurationsResourceUrl,
            this.descriptionFilter
          )
          .subscribe((page: ConfigurationsPage) => {
            this.configurationsPage = page;
          });
      });

    // handle refresh list requests (e.g. on deletion)
    this.listRefreshSubscription = this.configurationsService.configUpdated.pipe(retry(2)).subscribe(
      () => {
        this.configurationsService
          .getConfigurationsPage(Util.getHrefForRel(this.configurationsPage, "self"))
          .subscribe((page: ConfigurationsPage) => {
            this.configurationsPage = page;
          });
      }
    );

  //   // reset interface and go to start page (on create batch)
  //   this.resetListRequestedSubscription = this.batchesService.resetBatchListRequested.subscribe(
  //     () => {
  //       this.batchesService
  //         .getBatchesStartPage()
  //         .subscribe((page: BatchPage) => {
  //           this.page = page;
  //           this.descriptionFilter = "";
  //           this.filterInput.nativeElement.value = "";
  //           this.descendingSortOrder = true;
  //         });
  //     }
  //   );
  }

  ngOnDestroy(): void {
    this.listRefreshSubscription.unsubscribe();
    this.searchTextSubscription.unsubscribe();
  }

  /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.configurationsService
      .getConfigurationsPage(url)
      .subscribe((page: ConfigurationsPage) => {
        this.configurationsPage = page;
      });
  }


  onDeleteFile(config: Configuration) {
    this.configurationsService.deleteConfiguration(config).subscribe(
      (data) => {
        this.refreshConfigList();
      },

      (error) => {
        console.log(error);
      }
    )
  }

  refreshConfigList() {
    this.configurationsService.refetchConfigurationsPage(this.configurationsPage).subscribe(
      (page: ConfigurationsPage) => {
        this.configurationsPage = page;
      },

      (error) => {
        console.log(error);
      }
    )
  }

  onCreateNew() {
    this.configurationsService.createNewConfiguration().subscribe(
      (configuration: Configuration) => {
        this.router.navigate([configuration.id], {relativeTo: this.route});
        this.refreshConfigList();
      }
    )
  }




}
