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
import { ConfigurationsResolver } from './configurations/configurations-list-resolver.service';
import { ConfigurationManagerComponent } from './configurations/configuration-manager/configuration-manager.component';
import { ConfigurationEditComponent } from './configurations/configuration-manager/configuration-edit/configuration-edit.component';
import { ConfigurationResolver } from './configurations/configuration-manager/configuration-resolver.service';
import { NameRuleManagerComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-manager.component';
import { FileNameRulesResolver } from './configurations/configuration-manager/name-rule-manager/name-rules-resolver.service';
import { NameRuleStartComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-start/name-rule-start.component';
import { NameRuleEditComponent } from './configurations/configuration-manager/name-rule-manager/name-rule-edit/name-rule-edit.component';
import { FileNameRuleResolver } from './configurations/configuration-manager/name-rule-manager/name-rule-edit/name-rule-resolver.service';

const routes: Routes = [
    { path: '', redirectTo: '/batches', pathMatch: 'full' },
    { path: 'batches', component: BatchesComponent, resolve: {startPage: BatchesResolver}, children: [
        {path: '', component: BatchesStartComponent, pathMatch: 'full' },
        {path: 'new', component: BatchDefineComponent },
        {path: ':id', component: BatchManagerComponent, resolve: {batch: BatchResolver}, children: [
            {path: '', redirectTo: 'manage', pathMatch: 'full'},
            {path: 'info', component: BatchInfoComponent },
            {path: 'upload', component: FileUploaderComponent, canDeactivate:[CanDeactivateGuard] },
            {path: 'manage', component: BatchViewerComponent, resolve: {filesPage: FilesResolver} }
        ]}
    ]},
    {path: 'configurations', component: ConfigurationsComponent, runGuardsAndResolvers: 'always', resolve: {startPage: ConfigurationsResolver}, children: [
        {path: '', component: ConfigurationsListComponent, pathMatch:'full' },
        {path: ':id', component: ConfigurationManagerComponent, runGuardsAndResolvers: 'always',
        resolve: {configuration: ConfigurationResolver}, children: [
            {path: '', redirectTo: 'general', pathMatch: 'full' },
            {path: 'general', component: ConfigurationEditComponent, canDeactivate:[CanDeactivateGuard] },
            {path: 'namerules', component: NameRuleManagerComponent, resolve: {fileNameRulesPage: FileNameRulesResolver}, children: [
                {path: '', component: NameRuleStartComponent, pathMatch: 'full' },
                {path: 'new', component: NameRuleEditComponent, canDeactivate: [CanDeactivateGuard] },
                {path: ':id', component: NameRuleEditComponent,  resolve: {fileNameRule: FileNameRuleResolver},
                canDeactivate: [CanDeactivateGuard] },
            ]}
      ]}
    ]}
    // { path: '**', redirectTo: 'batches' }
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
    ],
    exports: [
        RouterModule
    ]
})
export class RoutesModule {

}
