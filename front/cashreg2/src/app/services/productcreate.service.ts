import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { product } from '../interface/product.interface';
import { Store } from "../interface/store.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductCreateService{
  constructor(private http: HttpClient) {}

  //localhost variable
  private baseUrl:string = 'http://localhost:5243/api/';

  //product array for method
  private arrproduct:product[] = [];



  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HTTP METHODS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Add prodcuts method
  addProducts(product: { id: number; name: string; price: number  }) {
    return this.http.post(`${this.baseUrl}Product/create-product`, product);
  }

  addjustaddidkwhattoputeheretbh(smth: {productList: Array<{idProduct:number}>}, smthbutstore:number ){
    const requestBody = {
      productList: smth.productList,
      smthbutstore:smthbutstore
    }
    return this.http.post(`${this.baseUrl}Product/create-ticket`,requestBody);
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
