import { NgModule, Component } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { BatchesComponent } from './batches/batches.component';
import { BatchesResolver } from './batches/batches-list-resolver.service';
import { BatchesStartComponent } from './batches/batches-start/batches-start.component';
import { BatchManagerComponent } from './batches/batch-manager/batch-manager.component';
import { FileUploaderComponent } from './batches/batch-manager/file-uploader/file-uploader.component';
import { BatchResolver } from './batches/batch-manager/batch-resolver.service';
import { BatchDefineComponent } from './batches/batch-define/batch-define.component';
import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { BatchViewerComponent } from './batches/batch-manager/batch-viewer/batch-viewer.component';
import { FilesResolver } from './batches/batch-manager/batch-viewer/files-resolver.service';
import { BatchInfoComponent } from './batches/batch-manager/batch-info/batch-info.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ConfigurationsListComponent } from './configurations/configurations-list/configurations-list.component';
import { ConfigurationsStartComponent } from './configurations/coonfigurations-start/configurations-start.component';
import { ConfigurationsResolver } from './configurations/configurations-list-resolver.service';


const routes: Routes = [
    { path: '', redirectTo: '/batches', pathMatch: 'full', data: {breadcrumb: ''} },
    { path: 'batches', component: BatchesComponent, resolve: {startPage: BatchesResolver}, data: {breadcrumb: ''}, children: [
        {path: '', component: BatchesStartComponent, pathMatch: 'full', data: {breadcrumb: ''}},
        {path: 'new', component: BatchDefineComponent, data: {breadcrumb: ''}},
        {path: ':id', component: BatchManagerComponent, resolve: {batch: BatchResolver}, data: {breadcrumb: ''}, children: [
            {path: '', redirectTo: 'manage', pathMatch: 'full', data: {breadcrumb: ''}},
            {path: 'info', component: BatchInfoComponent, data: {breadcrumb: ''}},
            {path: 'upload', component: FileUploaderComponent, canDeactivate:[CanDeactivateGuard], data: {breadcrumb: ''}},
            {path: 'manage', component: BatchViewerComponent, resolve: {filesPage: FilesResolver}, data: {breadcrumb: ''}}
        ]}
    ]},
    {path: 'configurations', component: ConfigurationsComponent, data: {breadcrumb: 'Configurations'}, resolve: {startPage: ConfigurationsResolver},  children: [
      {path: '', component: ConfigurationsStartComponent, pathMatch: 'full', data: {breadcrumb: 'Configurations'}},
    ]},
    // { path: '**', redirectTo: 'batches' }
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutesModule {

}
