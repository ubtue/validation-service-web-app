import { Component, OnInit, Input, Output } from '@angular/core';
import { Link } from '../shared/model/common-interfaces.model';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Output() navigationRequested: Subject<string> = new Subject<string>();
  @Input() page: { _links: Link[]};

  constructor() {}

  ngOnInit() {}

  getPageNumberOfLink(url: string): number {
    const x: number = + this.getParamValueFromUrl('page', url);
    return x + 1;
  }

  getParamValueFromUrl(paramName: string, url:string ): string {
    let paramValue: string;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  existsLinkWithRel(rel: string): boolean {
    for (const link of this.page._links) {
      if (link.rel === rel) {
        return true;
      }
    }
    return false;
  }

}
