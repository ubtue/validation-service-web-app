import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../shared/services/error.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor(public errorService: ErrorService) { }

  ngOnInit() {}

}
