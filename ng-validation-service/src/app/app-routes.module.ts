import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { BatchesComponent } from './batches/batches.component';
import { BatchesResolver } from './batches/batches-list-resolver.service';


const routes: Routes = [
    { path: '', redirectTo: '/batches', pathMatch:'full' },
    { path: 'batches', component: BatchesComponent, resolve:{startPage: BatchesResolver}}
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