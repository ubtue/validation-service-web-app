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

@NgModule({
  declarations: [
    AppComponent,
    BatchesComponent,
    HeaderComponent,
    PaginatorComponent,
    BatchesListComponent,
    BatchesStartComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [DataService, BatchesService, BatchesResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
