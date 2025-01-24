import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { product } from '../interface/product.interface';
import { Store } from "../interface/store.interface";
import { LinkStore } from "../interface/linkstore.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  constructor(private http: HttpClient) {}

  //localhost variable
  private baseUrl:string = 'http://localhost:5243/api/';

  //product array for method
  private arrproduct:product[] = [];

  private arrstores:Store[] = [];

  private arrlinks:LinkStore[]=[];

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HTTP METHODS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getall(){
    return this.http.get<product[]>(`${this.baseUrl}Product`)
  }

  //Add prodcuts method
  addProducts(payload: { productList: Array<{ idProduct: number; amount: number }> }, iD_Store:number) {
    const requestBody = {
      productList: payload.productList,
      iD_Store: iD_Store
    };
    return this.http.post(`${this.baseUrl}Product/create-ticket`,requestBody);
  }

  getstore(){
    return this.http.get<Store[]>(`${this.baseUrl}Product/store`)
  }

  getlink(id:number){
  return this.http.get<LinkStore[]>(`${this.baseUrl}Product/linkbyid?idstore=${id}`)
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
