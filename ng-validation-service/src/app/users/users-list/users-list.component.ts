import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersPage } from 'src/app/shared/model/users.model';
import { Message } from 'src/app/shared/model/primeng-message.model';
import { Util } from 'src/app/shared/util';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { UsersService } from '../users.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  // Subscription for refreshing configurations when user reclicks button in main nav
  navigationSubscription;
  searchTextSubscription: Subscription;

  searchTextChanged = new Subject<string>();
  userNameFilter = '';

  usersPage: UsersPage;
  messages: Message[];
  hrefToRel = Util.getHrefForRel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private usersService: UsersService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {

    // resolve page
    this.route.data.subscribe((data: Data) => {
      const resolved: Resolved<UsersPage> = data['startPage'];
      if (!resolved.data) {
        this.errorService.resolved = resolved;
        this.router.navigate(['/error']);
      }
      this.usersPage = resolved.data;
      this.messages = [];
    });

    // handle search text input
    this.searchTextSubscription = this.searchTextChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(filter => {
        this.userNameFilter = filter;
        this.usersService
          .getUsersPage(
            this.usersService.usersResourceUrl,
            this.userNameFilter
          )
          .subscribe(
            (page: UsersPage) => {
              this.usersPage = page;
            },
            (error) => {
              this.errorService.raiseGlobalErrorMessage('Search failed', error);
            }
          );
      });
  }

  /**
 * Load new page as triggered by paginator
 * @param url the url of the page to load
 */
  onLoadPage(url: string) {
    this.usersService
      .getUsersPage(url)
      .subscribe(
        (page: UsersPage) => {
          this.usersPage = page;
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to load user', error);
        }
      );
  }

  onDeleteUser(user: User) {
    this.usersService.deleteUser(user).subscribe(
      (data) => {
        this.refreshUserList();
      },
      (error) => {
        if (error.status === 404) {
          this.refreshUserList();
        } else {
          this.errorService.raiseGlobalErrorMessage('Failed to delete user', error);
        }
      }
    );
  }

  refreshUserList() {
    this.usersService.refetchUsersPage(this.usersPage).subscribe(
      (page: UsersPage) => {
        this.usersPage = page;
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to load configuration list', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }

    if (this.searchTextSubscription) {
      this.searchTextSubscription.unsubscribe();
    }
  }

}
