import { Component, OnInit, OnDestroy } from "@angular/core";
import { ConfigurationsPage } from "src/app/shared/model/configurations.model";
import { Message } from "src/app/shared/model/primeng-message.model";
import { Util } from "src/app/shared/util";
import { Subscription, Subject } from "rxjs";
import { ConfigurationsService } from "../configurations.service";
import { ConfirmationService } from "primeng/api";
import { ActivatedRoute, Data, Router, NavigationEnd } from "@angular/router";
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: "app-configurations-list",
  templateUrl: "./configurations-list.component.html",
  styleUrls: ["./configurations-list.component.css"]
})
export class ConfigurationsListComponent implements OnInit, OnDestroy {

  // For refreshing configurations when component already active
  navigationSubscription;

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
    private configurationsService: ConfigurationsService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      const resolved: Resolved<ConfigurationsPage> = data["startPage"];
      if (!resolved.data) {
        this.errorService.resolved = resolved;
        this.router.navigate(['/error']);
      }
      this.configurationsPage = resolved.data;
      this.messages = [];
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
          .subscribe(
            (page: ConfigurationsPage) => {
              this.configurationsPage = page;
            },
            (error) => {
              this.errorService.raiseGlobalErrorMessage('Search failed', error);
            }
          );
      });

      // Setup active page reload subscription
      this.navigationSubscription = this.router.events.subscribe(
        (e: any) => {
          // If it is a NavigationEnd event re-initalise the component
          if (e instanceof NavigationEnd) {
           this.refreshConfigList();
           }
        }
      );
  }

  ngOnDestroy(): void {
    this.searchTextSubscription.unsubscribe();
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  /**
   * Load new page as triggered by paginator
   * @param url the url of the page to load
   */
  onLoadPage(url: string) {
    this.configurationsService
      .getConfigurationsPage(url)
      .subscribe(
        (page: ConfigurationsPage) => {
          this.configurationsPage = page;
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to load configuration list', error);
        }
      );
  }


  onDeleteConfig(config: Configuration) {
    this.configurationsService.deleteConfiguration(config).subscribe(
      (data) => {
        this.refreshConfigList();
      },
      (error) => {
        if (error.status === 404) {
          this.refreshConfigList();
        } else {
          this.errorService.raiseGlobalErrorMessage('Failed to delete configuration', error);
        }
      }
    );
  }

  refreshConfigList() {
    this.configurationsService.refetchConfigurationsPage(this.configurationsPage).subscribe(
      (page: ConfigurationsPage) => {
        this.configurationsPage = page;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to load configuration list', error);
      }
    );
  }

  onCreateNew() {
    this.configurationsService.createNewConfiguration().subscribe(
      (configuration: Configuration) => {
        this.router.navigate([configuration.id], {relativeTo: this.route});
        this.refreshConfigList();
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to create configuration', error);
      }
    );
  }




}
