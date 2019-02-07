import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BatchesComponent } from './batches/batches.component';
import { RoutesModule } from './app-routes.module';
import { HeaderComponent } from './header/header.component';
import { DataService } from './shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { BatchesService } from './batches/batches.service';
import { BatchesResolver } from './batches/batches-list-resolver.service';
import { BatchesListComponent } from './batches/batches-list/batches-list.component';
import { BatchesStartComponent } from './batches/batches-start/batches-start.component';
import { BatchManagerComponent } from './batches/batch-manager/batch-manager.component';
import { FileUploaderComponent } from './batches/batch-manager/file-uploader/file-uploader.component';
import { BatchResolver } from './batches/batch-manager/batch-resolver.service';
import {FileUploadModule} from 'primeng/fileupload';
import { MessagesModule} from 'primeng/messages';
import { MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, DialogService} from 'primeng/api';
import { BatchDefineComponent } from './batches/batch-define/batch-define.component';
import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { BatchViewerComponent } from './batches/batch-manager/batch-viewer/batch-viewer.component';
import { FilesResolver } from './batches/batch-manager/batch-viewer/files-resolver.service';
import { FileSizePipe } from './shared/pipes/file-size.pipe';
import { BatchInfoComponent } from './batches/batch-manager/batch-info/batch-info.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ConfigurationsService } from './configurations/configurations.service';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfigurationsListComponent } from './configurations/configurations-list/configurations-list.component';
import {TableModule} from 'primeng/table';
import { ConfigurationsResolver } from './configurations/configurations-list-resolver.service';
import { ConfigurationManagerComponent } from './configurations/configuration-manager/configuration-manager.component';
import { ConfigurationEditComponent } from './configurations/configuration-manager/configuration-edit/configuration-edit.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ConfigurationResolver } from './configurations/configuration-manager/configuration-resolver.service';
import { NameRuleManagerComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-manager.component';
import { FileNameRulesResolver } from './configurations/configuration-manager/name-rule-manager/name-rules-resolver.service';
import { NameRuleEditComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-edit/name-rule-edit.component';
import { NameRuleStartComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-start/name-rule-start.component';
import { FileNameRuleResolver } from './configurations/configuration-manager/name-rule-manager/name-rule-edit/name-rule-resolver.service';
import {DropdownModule} from 'primeng/dropdown';
import { FitsRuleManagerComponent } from './configurations/configuration-manager/fits-rule-manager/fits-rule-manager.component';
import { FitsRuleEditComponent } from './configurations/configuration-manager/fits-rule-manager/fits-rule-edit/fits-rule-edit.component';
import { FitsRuleStartComponent } from './configurations/configuration-manager/fits-rule-manager/fits-rule-start/fits-rule-start.component';
import { FitsResultRulesResolver } from './configurations/configuration-manager/fits-rule-manager/fits-rules-resolver.service';
import { FitsResultRuleResolver } from './configurations/configuration-manager/fits-rule-manager/fits-rule-edit/fits-rule-resolver.service';
import { VerapdfSetupEditComponent } from './configurations/configuration-manager/verapdf-setup-edit/verapdf-setup-edit.component';
import {SpinnerModule} from 'primeng/spinner';
import {CheckboxModule} from 'primeng/checkbox';
import { ReportsComponent } from './reports/reports.component';
import { BatchValidatorComponent } from './batches/batch-manager/batch-validator/batch-validator.component';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { ConfigSelectorComponent } from './batches/batch-manager/batch-validator/config-selector/config-selector.component';
import { ReportsOverviewComponent } from './reports/reports-overview/reports-overview.component';
import { ReportsResolver } from './reports/reports-list-resolver.service';
import { ReportsService } from './reports/reports.service';
import { QueueResolver } from './reports/queue-list-resolver.service';
import { ReportViewerComponent } from './reports/report-viewer/report-viewer.component';
import { FileReportsListComponent } from './reports/report-viewer/file-reports-list/file-reports-list.component';
import { FileReportsListResolver } from './reports/report-viewer/file-reports-list.resolver.service';
import { BatchReportResolver } from './reports/report-viewer/batch-report-resolver.service';
import { FileReportViewerComponent } from './reports/report-viewer/file-report-viewer/file-report-viewer.component';
import { FileReportResolver } from './reports/report-viewer/file-report-resolver.service';
import {PanelModule} from 'primeng/panel';



@NgModule({
  declarations: [
    AppComponent,
    BatchesComponent,
    HeaderComponent,
    PaginatorComponent,
    BatchesListComponent,
    BatchesStartComponent,
    BatchManagerComponent,
    FileUploaderComponent,
    BatchDefineComponent,
    BatchViewerComponent,
    FileSizePipe,
    BatchInfoComponent,
    ConfigurationsComponent,
    BreadcrumbComponent,
    ConfigurationsListComponent,
    ConfigurationManagerComponent,
    ConfigurationEditComponent,
    NameRuleManagerComponent,
    NameRuleEditComponent,
    NameRuleStartComponent,
    FitsRuleManagerComponent,
    FitsRuleEditComponent,
    FitsRuleStartComponent,
    VerapdfSetupEditComponent,
    ReportsComponent,
    BatchValidatorComponent,
    ConfigSelectorComponent,
    ReportsOverviewComponent,
    ReportViewerComponent,
    FileReportsListComponent,
    FileReportViewerComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    RouterModule,
    TableModule,
    InputSwitchModule,
    RadioButtonModule,
    DropdownModule,
    SpinnerModule,
    CheckboxModule,
    DynamicDialogModule,
    PanelModule

  ],
  providers: [
    DataService,
    BatchesService,
    ConfigurationsService,
    BatchesResolver,
    BatchResolver,
    FilesResolver,
    CanDeactivateGuard,
    ConfirmationService,
    ConfigurationsResolver,
    ConfigurationResolver,
    FileNameRulesResolver,
    FileNameRuleResolver,
    FitsResultRulesResolver,
    FitsResultRuleResolver,
    ReportsResolver,
    ReportsService,
    QueueResolver,
    FileReportsListResolver,
    BatchReportResolver,
    FileReportResolver
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfigSelectorComponent]
})
export class AppModule { }
