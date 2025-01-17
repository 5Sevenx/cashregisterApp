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

  addlinkmethod(){

  }

}
