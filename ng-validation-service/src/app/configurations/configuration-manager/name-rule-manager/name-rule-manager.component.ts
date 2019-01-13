import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ConfigurationsService } from '../../configurations.service';
import { ConfirmationService } from 'primeng/api';
import { Configuration } from 'src/app/shared/model/configuration.model';
import { FileNameRulesPage } from 'src/app/shared/model/file-name-rules.model';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-name-rule-manager',
  templateUrl: './name-rule-manager.component.html',
  styleUrls: ['./name-rule-manager.component.css']
})
export class NameRuleManagerComponent implements OnInit {

  nameRulesPage: FileNameRulesPage;

  constructor(private route: ActivatedRoute, private configService: ConfigurationsService, private confirmationService: ConfirmationService) { }

  resolveCamelCase = Util.unCamelCase;

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.nameRulesPage = data['fileNameRulesPage'];
      }
    )
  }

}
