import { Component, OnInit, Input } from '@angular/core';
import { BreadCrumbItem } from './breadcrumb-item.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  items: BreadCrumbItem[];

  @Input() homeCrumb: BreadCrumbItem;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.items = [];
    this.buildCrumbPath(this.activatedRoute);

    console.log(this.activatedRoute.url.map(segments => segments.join(''));
    // TODO: navigate activated route parents upward to get crumbs

    console.log(this.activatedRoute);
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.buildCrumbPath(this.activatedRoute.root);

      console.log('oot');
    });
  }

  buildCrumbPath(activatedRoute: ActivatedRoute) {
       //set breadcrumbs
      this.items = [];
      for(const child of activatedRoute.children) {
        console.log(child.snapshot.url.map(urlSegment => urlSegment.path));
        let breadItem = new BreadCrumbItem();
        breadItem.path = child.snapshot['_routerState'].url;
        breadItem.description = child.snapshot.url.map(urlSegment => urlSegment.path)[0];
        this.items.push(breadItem);
      }
  }

  buildCrumbPathsss(activatedRoute: ActivatedRoute) {
    //set breadcrumbs
   this.items = [];
   for(const child of activatedRoute.children) {
     console.log(child.snapshot.url.map(urlSegment => urlSegment.path));
     let breadItem = new BreadCrumbItem();
     breadItem.path = child.snapshot['_routerState'].url;

     let segs: string[] =child.snapshot.url.map(urlSegment => urlSegment.path)[0].split('/');
     this.items = [];
     segs.forEach(element => {
      let breadItem = new BreadCrumbItem();
      breadItem.path = element;
      breadItem.description = element;
      this.items.push(breadItem);
    });


     breadItem.description = child.snapshot.url.map(urlSegment => urlSegment.path)[0];
     this.items.push(breadItem);
   }
}

}
