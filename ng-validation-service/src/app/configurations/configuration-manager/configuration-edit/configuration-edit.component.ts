import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Configuration } from 'src/app/shared/model/configuration.model';

@Component({
  selector: 'app-configuration-edit',
  templateUrl: './configuration-edit.component.html',
  styleUrls: ['./configuration-edit.component.css']
})
export class ConfigurationEditComponent implements OnInit {

  checked: boolean = true;
  selectedValue: string;

  selectedConfiguration: Configuration;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: Data) => {
        this.selectedConfiguration = data['configuration'];
        console.log(this.selectedConfiguration);
      }
    )
  }

}
