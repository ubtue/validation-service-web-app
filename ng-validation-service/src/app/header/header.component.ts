import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarCollapsed = true;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {

  }

  onNavBarButtonPressed() {
    this.navbarCollapsed = ! this.navbarCollapsed;
  }



}
