import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { product } from '../interface/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http: HttpClient) {}

  //localhost variable
  private baseUrl:string = 'http://localhost:5243/api/';

  //product array for method
  private arrproduct:product[] = [];


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HTTP METHODS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getall(){
    return this.http.get<product[]>(`${this.baseUrl}Product`)
  }


  //Add prodcuts method
  addProducts(payload: { productList: Array<{ idProduct: number; amount: number }> }) {
    return this.http.post(`${this.baseUrl}Product/create-ticket`, payload);
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



}
