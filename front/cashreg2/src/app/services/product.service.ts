import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { product } from '../interface/product.interface';
import { Store } from "../interface/store.interface";


@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http: HttpClient) {}

  //localhost variable
  private baseUrl:string = 'http://localhost:5243/api/';

  //product array for method
  private arrproduct:product[] = [];

  private arrstores:Store[] = []

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HTTP METHODS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getall(){
    return this.http.get<product[]>(`${this.baseUrl}Product`)
  }


  //Add prodcuts method
  addProducts(payload: { productList: Array<{ idProduct: number; amount: number }> }) {
    return this.http.post(`${this.baseUrl}Product/create-ticket`, payload);
  }

  getstore(){
    return this.http.get<Store[]>(`${this.baseUrl}Product/store`)
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



}
