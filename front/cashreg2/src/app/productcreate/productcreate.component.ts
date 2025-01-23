import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductCreateService } from '../services/productcreate.service';
import { Store } from '../interface/store.interface';
import { StoreService } from '../services/store.service';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';


@Component({
  selector: 'productcreate',
  templateUrl: './productcreate.component.html',
    standalone:true,
    imports: [
  CommonModule,FormsModule, RouterModule
    ],

})

export class ProductcreateComponent  implements OnInit {
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
  productname: string = '';
  productprice:number ;

  tableItems:Array<{id:number,name:string,}> = [];



  addproduct(){
    if (this.productname.trim() === '') {
      alert('Please enter a product name!');
      return;
    }

    if (this.productprice <= 0) {
      alert('Please enter a valid product price!');
      return;
    }

    const product = {id:0, name:this.productname, price:this.productprice};

    this.ProductCreateService.addProducts(product).subscribe({
      next:(response)=> alert ('Product created'),
      error:(error) => alert('Eror creating product:' + error.message)
    })


  }


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
    if (this.selectedStore && this.tableItems.length > 0) {

      const productList = this.tableItems.map(item => ({ iD_Product: item.id }));

      this.tableItems = [];

      this.ProductCreateService.addlink(
        { iD_Product: productList },
        this.selectedStore.iD_Store

      ).subscribe({
        next: () => alert('Products successfully added to the store!'),
        error: (error) => alert('Error: ' + error.message)
      });
    } else {
      alert('Please select a store and add products to the table before linking!');
    }
  }


}
