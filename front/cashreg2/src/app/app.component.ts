import { Component } from '@angular/core';
import { product } from './interface/product.interface';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++VARIABLE FOR NUMS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);






  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET PRODUCT NAME+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ngOnInit(): void {
    this.getproducts();
  }

  products:product[] = [];
  constructor (private productService:ProductService){
  }

  getproducts(){
    this.productService.getall().subscribe((data) => {
      console.log(data);
      this.products = data;
    }
    )
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
