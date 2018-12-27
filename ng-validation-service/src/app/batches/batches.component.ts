import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { BatchPage } from '../shared/model/batches.model';
import { Observable } from "rxjs";


@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBatchesPage().subscribe(
      (page: BatchPage) =>{
        console.log(page);
      }
    )
  }

}
