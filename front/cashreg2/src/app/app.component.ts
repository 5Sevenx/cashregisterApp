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
  selectedProduct: product | null = null;
  selectedAmount: number = 1;
  tableItems: Array<{ id: number; name: string; price: number }> = [];

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

  addToTable() {
    if (this.selectedProduct && this.selectedAmount) {
      const totalPrice = this.selectedProduct.price * this.selectedAmount;
      const existingItem = this.tableItems.find(
        (item) => item.id === this.selectedProduct!.id
      );

      if (existingItem) {
        existingItem.price += totalPrice;
      } else {
        this.tableItems.push({
          id: this.selectedProduct.id,
          name: this.selectedProduct.name,
          price: totalPrice,
        });
      }
    }
  }

  removeFromTable(index: number) {
    this.tableItems.splice(index, 1);
  }
}
