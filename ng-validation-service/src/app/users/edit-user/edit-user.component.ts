import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Resolved } from 'src/app/shared/model/resolved.model';
import { ErrorService } from 'src/app/shared/services/error.service';
import { Util } from 'src/app/shared/util';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @ViewChild('form', { static: false }) form: NgForm;

  private creationMode = false;
  private user: User;
  userCopy: User;
  roleTypes: SelectItem[];

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit() {

    this.roleTypes = [
      { label: 'User', value: 'user' },
      { label: 'Administrator', value: 'admin' }
    ];

    this.route.data.subscribe(
      (data) => {
        const resolved: Resolved<User> = data['user'];

        if (resolved) {
          if (!resolved.data) {
            this.errorService.resolved = resolved;
            this.router.navigate(['/error']);
          } else {
            this.user = resolved.data;
          }
        } else {
          this.user = new User();
          this.user.username = '';
          this.user.role = 'user';
          this.user.password = '';
          this.creationMode = true;
        }
        this.userCopy = <User>Util.deepCopy(this.user);
      },
      (error) => {
        this.errorService.raiseGlobalErrorMessage('Failed to load data', error);
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.resetFormValues();
  }

  onSave() {
    if (this.creationMode) {
      this.userService.createUser(this.userCopy).subscribe(
        (result) => {
          this.user = result;
          this.form.reset();
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error) => {
          this.errorService.raiseGlobalErrorMessage('Failed to create user', error);
        }
      );
    } else {
      this.userService.updateUser(this.userCopy).subscribe(
        (result) => {
          this.user = <User>Util.deepCopy(this.userCopy);
          this.resetFormValues();
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error) => {
          if (error.status === 404) {
            this.form.reset();
            this.router.navigate(['../'], { relativeTo: this.route });
          } else {
            this.errorService.raiseGlobalErrorMessage('Failed to save changes', error);
          }
        }
      );
    }
  }

  resetFormValues() {
    let resetValues = {
      name: this.user.username,
      role: this.user.role,
      password: this.user.password,
    };

    this.form.reset(resetValues);
  }

  isInCreationMode() {
    return this.creationMode;
  }

}
