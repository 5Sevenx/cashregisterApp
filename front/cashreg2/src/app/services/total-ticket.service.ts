import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ticket } from "../interface/ticket.interface";
import { total } from "../interface/total.interfaces";



@Injectable({
  providedIn: 'root'
})

export class TotalTicketService{

  constructor(private http: HttpClient) {}

  //localhost variable
  private baseUrl:string = 'http://localhost:5243/api/';

  //total-ticket array for method
  private arrticket:ticket[] = [];
  private arrtotal:total[] = [];


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++HTTP METHODS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getticket(){
    return this.http.get<ticket[]>(`${this.baseUrl}Product/ticket`)
  }

  gettotal(){
    return this.http.get<total[]>(`${this.baseUrl}Product/total`)
  }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



}
