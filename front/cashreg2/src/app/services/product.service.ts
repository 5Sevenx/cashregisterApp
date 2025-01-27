import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { product } from '../interface/product.interface';
import { Store } from "../interface/store.interface";
import { LinkStore } from "../interface/linkstore.interface";
import { StoreChange } from "../interface/storechange.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  constructor(private http: HttpClient) {}

  //localhost variable
  private baseUrl:string = 'http://localhost:5243/api/Product';

  //product array for method
  private arrproduct:product[] = [];

  private arrstores:Store[] = [];

  private arrlinks:LinkStore[]=[];

  private arrsotrechange:StoreChange [] =[];

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HTTP METHODS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getall(){
    return this.http.get<product[]>(`${this.baseUrl}`)
  }

  //Add prodcuts method
  addProducts(payload: { productList: Array<{ idProduct: number; amount: number }> }, iD_Store:number) {
    const requestBody = {
      productList: payload.productList,
      iD_Store: iD_Store
    };
    return this.http.post(`${this.baseUrl}/create-ticket`,requestBody);
  }

  getstore(){
    return this.http.get<Store[]>(`${this.baseUrl}/store`);
  }

  getlink(id:number){
  return this.http.get<StoreChange>(`${this.baseUrl}/linkbyid?idstore=${id}`);
  }

  getProductsByIds(ids: number[]) {
    const idsParam = ids.join(',');
    return this.http.get<product[]>(`${this.baseUrl}/getproductbyid?idproduct=${idsParam}`);
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
