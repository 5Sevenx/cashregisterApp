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

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET PRODUCT NAME++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  selectedProduct: product | null = null;
  selectedAmount = 1;
  tableItems: Array<{ id: number; name: string; price: number, amount:number }> = [];

  //Pre-load
  ngOnInit(): void {
    this.getproducts();
  }

  products:product[] = [];
  constructor (private productService:ProductService){
  }

  //show products method
  getproducts(){
    this.productService.getall().subscribe((data) => {
      console.log(data);
      this.products = data;
    }
    )
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++PRODUCT TABLE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //Add to table logic
  addToTable() {
    if (this.selectedProduct) {
      //if the product already exists in the table
      const existingProduct = this.tableItems.find(item => item.name === this.selectedProduct?.name);

      if (existingProduct) {
        // If the product exists,update the amount by adding the selected amount
        existingProduct.amount +=  Number(this.selectedAmount) ;
        existingProduct.price = existingProduct.amount * this.selectedProduct.price;
      } else {

        const price = this.selectedProduct.price;
        this.tableItems.push({
          id: this.tableItems.length + 1,
          name: this.selectedProduct.name,
          amount: this.selectedAmount,
          price: price * this.selectedAmount,
        });
      }
    } else {
      alert('Select product');
    }
  }



  //Remove items
  removeItem(index: number) {
    this.tableItems.splice(index, 1);
  }

  //Total price calculating
  get totalPrice(): number {
    return this.tableItems.reduce((sum, item) => sum + item.price, 0);
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++INSERT BUTTON++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  sendTableProducts() {
    const payload = {
      productList: this.tableItems.map(item => ({
        idProduct: item.id,
        amount: item.amount || 1
      }))
    };

    this.productService.addProducts(payload).subscribe(
      response => {
        console.log('Products sent successfully:', response);
        alert('Products sent successfully!');
        this.tableItems = [];
      },
      error => {
        console.error('Error sending products:', error);
        alert('Failed to send products');

      }
    );
  }
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
