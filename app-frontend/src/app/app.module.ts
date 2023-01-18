import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProducerComponent } from './components/add-producer/add-producer.component';
import { ProducerDetailsComponent } from './components/producer-details/producer-details.component';
import { ProducerListComponent } from './components/producer-list/producer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProducerComponent,
    ProducerDetailsComponent,
    ProducerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
