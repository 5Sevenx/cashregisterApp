import { Component, OnInit } from '@angular/core';
import { ticket } from '../interface/ticket.interface';
import { total } from '../interface/total.interfaces';
import { TotalTicketService } from '../services/total-ticket.service';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { product } from '../interface/product.interface';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Store } from '../interface/store.interface';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'main',
  templateUrl: './store.component.html',
    standalone:true,
    imports: [
  CommonModule,FormsModule, RouterModule
    ]
})

export class StoreComponent  implements OnInit {

  storeName: string = '';

  ngOnInit() {
  }

 constructor(private StoreService:StoreService, private Route:Router){}

 addStore() {
  if (this.storeName.trim() === '') {
    // Handle the case when the store name is empty
    alert('Please enter a store name');
    return;
  }

  const store = { iD_Store: 0,name: this.storeName }; // Create object with name property

  // Call the service method to add the store
  this.StoreService.addStore(store)
    .subscribe(response => {
      alert("Store created!")

      this.storeName = '';
      //redirect
      this.Route.navigate(['/main']);
    }, error => {
      alert("Error creating store!")
    });
}


}
