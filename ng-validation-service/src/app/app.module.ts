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
import {ConfirmationService} from 'primeng/api';
import { BatchDefineComponent } from './batches/batch-define/batch-define.component';
import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { BatchViewerComponent } from './batches/batch-manager/batch-viewer/batch-viewer.component';
import { FilesResolver } from './batches/batch-manager/batch-viewer/files-resolver.service';
import { FileSizePipe } from './shared/pipes/file-size.pipe';
import { BatchInfoComponent } from './batches/batch-manager/batch-info/batch-info.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ConfigurationsService } from './configurations/configurations.service';
// import {BreadcrumbModule} from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfigurationsListComponent } from './configurations/configurations-list/configurations-list.component';
import {TableModule} from 'primeng/table';
import { ConfigurationsStartComponent } from './configurations/coonfigurations-start/configurations-start.component';
import { ConfigurationsResolver } from './configurations/configurations-list-resolver.service';

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
    ConfigurationsStartComponent
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
    TableModule

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
    ConfigurationsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
