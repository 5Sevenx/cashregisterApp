import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MainComponent } from './main/main.component';
import { TicketComponent } from './tickets/ticket.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { StoreComponent } from './storecreate/store.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MainComponent,
    TicketComponent,
    NavbarComponent,
    StoreComponent
],
  providers: [ provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
