import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Batch } from 'src/app/shared/model/batch.model';
import { ActivatedRoute, Data } from '@angular/router';

import { Link } from '../../../shared/model/common-interfaces.model';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploaderComponent implements OnInit {

  selectedBatch: Batch;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: Data) => {
        this.selectedBatch = data['batch'];
      }
    )
  }

  getHrefForLink(representation: { _links: Link[] }, rel: string): string {
    for (let link of representation._links) {
      if (link.rel === rel)
        return link.href
    }
    return null;
  }

}
