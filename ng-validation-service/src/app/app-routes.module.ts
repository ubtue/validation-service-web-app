import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { BatchesComponent } from './batches/batches.component';
import { BatchesResolver } from './batches/batches-list-resolver.service';
import { BatchesStartComponent } from './batches/batches-start/batches-start.component';
import { BatchManagerComponent } from './batches/batch-manager/batch-manager.component';
import { FileUploaderComponent } from './batches/batch-manager/file-uploader/file-uploader.component';
import { BatchResolver } from './batches/batch-manager/batch-resolver.service';
import { BatchDefineComponent } from './batches/batch-define/batch-define.component';
import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';


const routes: Routes = [
    { path: '', redirectTo: '/batches', pathMatch:'full' },
    { path: 'batches', component: BatchesComponent, resolve: {startPage: BatchesResolver}, children: [
        {path: '', component: BatchesStartComponent},
        {path:'new', component:BatchDefineComponent},
        {path: ':id', component: BatchManagerComponent, resolve: {batch: BatchResolver}, children: [
            {path:'', redirectTo:"upload", pathMatch:'full'},
            {path:'upload', component:FileUploaderComponent, canDeactivate:[CanDeactivateGuard]}
        ]}
    ]}
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