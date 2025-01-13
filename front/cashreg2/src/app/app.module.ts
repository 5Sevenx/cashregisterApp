import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MainComponent } from './main/main.component';
import { TicketComponent } from './tickets/ticket.component';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MainComponent,
    TicketComponent

  ],
  providers: [ provideHttpClient()

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
