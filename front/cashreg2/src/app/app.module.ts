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
import { ProductcreateComponent } from './productcreate/productcreate.component';


import { SendButComponent } from './beauty-components/send-button/send-but.component';
import { DelButtonComponent } from './beauty-components/del-button/del-button.component';
import { ViewButtonComponent } from './beauty-components/view-button/view-button.component';
import { SumbButtonComponent } from './beauty-components/sumb-button/sumb-button.component';
import { AssociateProductComponent } from './associate-product/associate-product.component';




@NgModule({
  declarations: [
    AppComponent,
    AssociateProductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MainComponent,
    TicketComponent,
    NavbarComponent,
    StoreComponent,
    ProductcreateComponent,
    SendButComponent,
    DelButtonComponent,
    ViewButtonComponent,
    SumbButtonComponent,
],
  providers: [ provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
