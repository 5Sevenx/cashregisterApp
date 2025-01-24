import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductCreateService } from '../services/productcreate.service';
import { Store } from '../interface/store.interface';
import { StoreService } from '../services/store.service';
import { ProductService } from '../services/product.service';
import { product } from '../interface/product.interface';
import { SendButComponent } from '../beauty-components/send-button/send-but.component';
import { DelButtonComponent } from '../beauty-components/del-button/del-button.component';



@Component({
  selector: 'productcreate',
  styleUrls: ['./productcreate.component.css'],
  templateUrl: './productcreate.component.html',
    standalone:true,
    imports: [
  CommonModule,FormsModule, RouterModule, SendButComponent,
    ],

})

export class ProductcreateComponent  implements OnInit {
  ngOnInit(): void {
  }

  constructor(private ProductCreateService:ProductCreateService){}

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
}
