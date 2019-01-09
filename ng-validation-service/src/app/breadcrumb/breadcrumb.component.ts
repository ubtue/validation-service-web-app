import { Component, OnInit, Input } from '@angular/core';
import { BreadCrumbItem } from './breadcrumb-item.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  items: BreadCrumbItem[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.buildCrumbPath(this.activatedRoute);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(event => this.buildCrumbPath(this.activatedRoute.root)),
      startWith(this.buildCrumbPath(this.activatedRoute.root)))
      .subscribe(event => {
        this.items = this.buildCrumbPath(this.activatedRoute.root);
    });
  }

  buildCrumbPath(route: ActivatedRoute, url: string = '',
                breadcrumbs: Array<BreadCrumbItem> = []): Array<BreadCrumbItem> {
    // If no routeConfig then we are on the root path
    if (!route.routeConfig) {
      return this.buildCrumbPath(route.firstChild, '/', []);
    }

    const label = route.routeConfig.data[ 'breadcrumb' ];
    const path = route.routeConfig.path;

    // In the routeConfig the complete path is not available, so we rebuild it each time
    const nextUrl =  route.firstChild ?  `${url}${path}/` : `${url}${path}` ;
    const breadcrumb = {
        path: nextUrl,
        description: label
    };

    // Remove duplicate route entries
    if (breadcrumbs.length !== 0) {
      const lastCrumb = breadcrumbs.slice().pop();
      if (lastCrumb.path === breadcrumb.path) {
        breadcrumbs.pop();
      }
    }

    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
        // If we are not on our current path yet, there will be more children to look after
        return this.buildCrumbPath(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

}
