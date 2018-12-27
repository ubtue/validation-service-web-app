import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BatchesComponent } from './batches/batches.component';
import { RoutesModule } from './app-routes.module';
import { HeaderComponent } from './header/header.component';
import { DataService } from './shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BatchesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
