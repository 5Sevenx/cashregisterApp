import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';
import { SendButComponent } from '../beauty-components/send-button/send-but.component';

@Component({
  selector: 'main',
  templateUrl: './store.component.html',
  styleUrls:['./store.components.css'],
    standalone:true,
    imports: [
  CommonModule,FormsModule, RouterModule,SendButComponent
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
