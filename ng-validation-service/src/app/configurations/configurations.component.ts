import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem } from '../breadcrumb/breadcrumb-item.model';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  home: BreadCrumbItem;
  breadCrumbs: BreadCrumbItem[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  //   this. home = new BreadCrumbItem();
  //   this.home.description="Configuration";
  //   this.home.path = "/configurations";


  //   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
  //     //set breadcrumbs
  //     let root: ActivatedRoute = this.route.root;
  //     this.breadCrumbs = this.getBreadcrumbs(root);
  //     this.breadCrumbs = [this.home, ...this.breadCrumbs];
  //   });

  }

  // private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: BreadCrumbItem[] = []): BreadCrumbItem[] {
  //   const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

  //   //get the child routes
  //   let children: ActivatedRoute[] = route.children;

  //   //return if there are no more children
  //   if (children.length === 0) {
  //     return breadcrumbs;
  //   }

  //   //iterate over each children
  //   for (let child of children) {
  //     //verify primary route
  //     if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length==0) {
  //       continue;
  //     }

  //     //verify the custom data property "breadcrumb" is specified on the route
  //     if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
  //       return this.getBreadcrumbs(child, url, breadcrumbs);
  //     }

  //     //get the route's URL segment
  //     let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

  //     //append route URL to URL
  //     url += `/${routeURL}`;

  //     //add breadcrumb
  //     let breadcrumb: BreadCrumbItem = {
  //       label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
  //       url: url
  //     };
  //     breadcrumbs.push(breadcrumb);

  //     //recursive
  //     return this.getBreadcrumbs(child, url, breadcrumbs);
  //   }
  //   return breadcrumbs;
  // }

  add(){
    let brumb = new BreadCrumbItem();
    brumb.description="batches";
    brumb.path="/batches";
    this.breadCrumbs.push(brumb);
  }

}
