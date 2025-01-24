import { Component, OnInit } from '@angular/core';
import { product } from '../interface/product.interface';
import { Store } from '../interface/store.interface';
import { ProductService } from '../services/product.service';

import { ProductCreateService } from '../services/productcreate.service';

@Component({
  selector: 'app-associate-product',
  standalone: false,

  templateUrl: './associate-product.component.html',
  styleUrl: './associate-product.component.css'
})
export class AssociateProductComponent  implements OnInit{

 ngOnInit(): void {
    this.getstore();
    this.getproduct();
  }

  getstore(){
    this.Store.getstore().subscribe(d =>{
      this.stores = d;
    })
  }

  getproduct(){
    this.Store.getall().subscribe(d =>{
      this.product = d;
    })
  }

  product:product [] = [];
  stores:Store [] = [];
  constructor(private ProductCreateService:ProductCreateService, private Store:ProductService){}
  selectedStore:Store | null = null;
  selectedproduct:product | null = null;
  tableItems:Array<{id:number,name:string,}> = [];


  addToTable() {
    if (this.selectedproduct && this.selectedStore) {
      // Check if the product already exists in the table
      const existingProduct = this.tableItems.find(i => i.name === this.selectedproduct?.name);

      if (existingProduct) {
        alert('Product already exists in the table!');
      } else {
        // Add the selected product to the table
        this.tableItems.push({
          id: this.tableItems.length + 1,
          name: this.selectedproduct.name
        });
      }
    } else {
      alert('Please select a product and a store before adding to the table!');
    }
  }

  
  linkProducts() {
    if (this.selectedStore && this.tableItems.length > 0 ) {
      const exitingStore = this.tableItems.find(i => i.id !== this.selectedStore?.iD_Store)&&this.tableItems.find(i => i.id);
      if(exitingStore){
        const productList = this.tableItems.map(item => ({ iD_Product: item.id }));

      this.tableItems = [];

      this.ProductCreateService.addlink(
        { iD_Product: productList },
        this.selectedStore.iD_Store

      ).subscribe({
        next: () => alert('Products successfully added to the store!'),
        error: (error) => alert('Error: ' + error.message)
      });
    } else{
      alert('You tying to asing entire list with one store to other. If you want to do that delete all items from the list first, then change store');
    }
      }else {
        alert('Please select a store and add products to the table before linking!');
      }
  }

  removeItem(index: number) {
    this.tableItems.splice(index, 1);
  }
}
