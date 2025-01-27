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

  addlink(smth: {iD_Product: Array<{iD_Product:number}>}, iD_Store:number ){
    const requestBody = {
      iD_Product: smth.iD_Product,
      iD_Store:iD_Store
    }
    return this.http.post(`${this.baseUrl}Product/create-link-to-store`,requestBody);
  }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
