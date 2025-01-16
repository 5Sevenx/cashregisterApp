import { Component, OnInit } from '@angular/core';
import { product } from '../interface/product.interface';
import { ProductService } from '../services/product.service';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '../interface/store.interface';
@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  standalone:true,
  imports: [
CommonModule,CurrencyPipe,FormsModule, RouterModule
  ]
})

export class MainComponent  implements OnInit {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++VARIABLE FOR NUMS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET PRODUCT NAME++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  selectedProduct: product | null = null;
  selectedStore:Store | null = null;
  selectedAmount = 1;
  tableItems: Array<{ id: number; name: string; price: number, amount:number , iD_Store:number}> = [];
  justnameofthestore: Array<{_store:string}> = [];

  //Pre-load
  ngOnInit(): void {
    this.getproducts();
    this.getstores();
  }

  stores:Store [] = [];
  products:product[] = [];
  constructor (private productService:ProductService,
    private routerModule: RouterModule
  ){
  }

  //show products method
  getproducts(){
    this.productService.getall().subscribe((d) => {
      console.log(d);
      this.products = d;
    }
    )
  }

  getstores(){
    this.productService.getstore().subscribe((d)=> {
      console.log(d);
      this.stores = d;
    })
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++PRODUCT TABLE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Add to table logic
  addToTable() {
    if (this.selectedProduct && this.selectedStore) {
      //if the product already exists in the table
      const existingProduct = this.tableItems.find(i => i.name === this.selectedProduct?.name);
      //prevent user from try to add new product being on other store
      const exitingStore = this.tableItems.find(i => i.iD_Store !== this.selectedStore?.iD_Store)&&this.tableItems.find(i => i.id);

      if (exitingStore){
        alert ('Store already choosen, delet all the products before set new store!')

      }else{
        if (existingProduct) {
          // If the product exists,update the amount by adding the selected amount
          existingProduct.amount +=  Number(this.selectedAmount) ;
          existingProduct.price = existingProduct.amount * this.selectedProduct.price;
        } else {
          //clear table with name of the store to not duplicate it
          this.justnameofthestore = [];

          const price = this.selectedProduct.price;
          this.tableItems.push({
            id: this.tableItems.length + 1,
            name: this.selectedProduct.name,
            amount: Number(this.selectedAmount),
            price: price * Number(this.selectedAmount),
            iD_Store:this.selectedStore.iD_Store
          });
          //add name of the store
          this.justnameofthestore.push({
            _store: this.selectedStore.name
          })
        }
      }

    } else {
      alert('Make sure you have the right product and store');
    }
  }

  //Remove items
  removeItem(index: number) {
    this.tableItems.splice(index, 1);
    //also delete name of the store if there is no products
    if(this.tableItems.length > index, 1) this.justnameofthestore = [];
  }

  //Total price calculating
  get totalPrice(): number {
    return this.tableItems.reduce((sum, item) => sum + item.price, 0);
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++INSERT BUTTON++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  sendTableProducts() {
  // Ensure all items have the same store
  const uniqueStores = this.tableItems.map(item => item.iD_Store);

  // defined cont for addproducts method
  const iD_Store = uniqueStores[0];
  const payload = {
    productList: this.tableItems.map(item => ({
      idProduct: item.id,
      amount: item.amount,
    }))
  };

  this.productService.addProducts(payload, iD_Store).subscribe(
    response => {
      alert('Products sent successfully!');
      this.tableItems = [];
      this.justnameofthestore = [];
    },
    error => {
      alert('Failed to send products');
    }
  );
}
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++INCREMENT BUTTNOS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  decrementAmount(amount : number){
     //prevent negative or zero
    if(this.tableItems[amount].amount > 1){
        this.tableItems[amount].amount -= 1;
        this.tableItems[amount].price = this.tableItems[amount].amount * (this.products.find(p => p.name === this.tableItems[amount].name)?.price || 0)
    }
  }

  incrementAmount(amount : number){
    this.tableItems[amount].amount += 1;
    this.tableItems[amount].price = this.tableItems[amount].amount * (this.products.find(p => p.name === this.tableItems[amount].name)?.price || 0)
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
