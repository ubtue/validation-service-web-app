import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { BatchesComponent } from './batches/batches.component';


const routes: Routes = [
    { path: '', redirectTo: '/batches', pathMatch:'full' },
    { path: 'batches', component: BatchesComponent}
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