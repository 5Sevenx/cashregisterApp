import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { product } from "../interface/product.interface";


@Injectable({
  providedIn: 'root'
})
export class ProductService{

  constructor(private http: HttpClient) {}

  private baseUrl:string = 'http://localhost:5243/api/';

  getall(){
    return this.http.get<product[]>(`${this.baseUrl}Product`)
  }
}
