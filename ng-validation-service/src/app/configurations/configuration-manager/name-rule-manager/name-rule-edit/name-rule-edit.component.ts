import { Component, OnInit } from '@angular/core';
import { FileNameRule } from 'src/app/shared/model/file-name-rule.model';

@Component({
  selector: 'app-name-rule-edit',
  templateUrl: './name-rule-edit.component.html',
  styleUrls: ['./name-rule-edit.component.css']
})
export class NameRuleEditComponent implements OnInit {

  fileNameRule: FileNameRule;

  constructor() { }

  ngOnInit() {
  }

}
