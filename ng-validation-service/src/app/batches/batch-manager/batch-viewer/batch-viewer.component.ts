import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/shared/model/batch.model';
import { Message } from 'src/app/shared/primeng-message.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-batch-viewer',
  templateUrl: './batch-viewer.component.html',
  styleUrls: ['./batch-viewer.component.css']
})
export class BatchViewerComponent implements OnInit {

  selectedBatch: Batch;
  messages: Message[];
  hrefToRel = Util.getHrefForRel;


  constructor(private route: ActivatedRoute, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: Data) => {
        this.selectedBatch = data['batch'];
        this.messages = [];
      }
    )
  }

}
