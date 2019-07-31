import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('form', { static: false }) form: NgForm;


  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if(this.authenticationService.isAuthenticated()) {
      this.authenticationService.logout();
    }
  }

  onLogin() {
    this.authenticationService.login(this.form.value.login, this.form.value.password).subscribe(
      (loggedIn:boolean) =>  {
        if (loggedIn) {
          this.router.navigate(['/batches']);
        } else {

        }
      }
    );


  }

}
