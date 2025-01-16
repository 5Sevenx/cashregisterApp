import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ticket } from "../interface/ticket.interface";
import { total } from "../interface/total.interfaces";
import { Store } from "../interface/store.interface";

@Injectable({
  providedIn: 'root'
})

export class StoreService{

  constructor(private http: HttpClient) {}

  //localhost variable
  private baseUrl:string = 'http://localhost:5243/api/';

  //total-ticket array for method
  private arrstore:Store[] = [];

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HTTP METHODS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  addStore(store:{iD_Store:number; name:string}){
    const requestBody = {
      iD_Store: 0,
      name:store
    }
    return this.http.post(`${this.baseUrl}Product/create-store`,requestBody);
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
