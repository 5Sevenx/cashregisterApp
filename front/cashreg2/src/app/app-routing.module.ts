import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TicketComponent } from './tickets/ticket.component';
import { StoreComponent } from './storecreate/store.component';
import { ProductcreateComponent } from './productcreate/productcreate.component';
import { AssociateProductComponent } from './associate-product/associate-product.component';


const routes: Routes = [
  {path:'', redirectTo:'/main', pathMatch:'full'},
  {path:'main',component: MainComponent},
  {path:'ticket',component: TicketComponent},
  {path:'store',component: StoreComponent},
  {path:'product',component: ProductcreateComponent},
  {path:'product-assoiate',component: AssociateProductComponent},
  {path:'**', redirectTo:'/main'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
