import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TicketComponent } from './tickets/ticket.component';
import { StoreComponent } from './storecreate/store.component';


const routes: Routes = [
  {path:'', redirectTo:'/main', pathMatch:'full'},
  {path:'main',component: MainComponent},
  {path:'ticket',component: TicketComponent},
  {path:'store',component: StoreComponent},
  {path:'**', redirectTo:'/main'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
