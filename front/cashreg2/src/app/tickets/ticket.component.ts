import { Component, OnInit } from '@angular/core';
import { ticket } from '../interface/ticket.interface';
import { total } from '../interface/total.interfaces';
import { TotalTicketService } from '../services/total-ticket.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { product } from '../interface/product.interface';

@Component({
  selector: 'main',
  templateUrl: './ticket.component.html',
    standalone:true,
    imports: [
  CommonModule,FormsModule, RouterModule
    ]
})

export class TicketComponent  implements OnInit {

  //Pre-load
  ngOnInit() {
    this.gettotal();
    this.gettickets();
  }

  //Tables
  tableItemsTotal: Array<{​product_ID:number,total_Id:number,amount:number,price:number }> = [];
  tableItemsTicket: Array<{id:number,price:number,date:Date }> = [];

  tabletoadd: Array<{id:number, name:string,price:number,amount:number}> = [];


  //include totalticketservice
  constructor(private TotalTicketService:TotalTicketService) { }

  //include interface arrays
  private products:product[] = [];
  private arrticket:ticket[] = [];
  private arrtotal:total[] = [];



  selectedTotal:number | null= null;
  selectedTicket:number | null = null;

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET TOTAL&TICKET INFO++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  gettotal(){
    this.TotalTicketService.gettotal().subscribe((d) => {
      console.log(d);
      this.arrtotal = d;
      this.tableItemsTotal = d;
    })
  }

  gettickets(){
    this.TotalTicketService.getticket().subscribe((d) => {
      console.log(d);
      this.arrticket = d;
      this.tableItemsTicket = d;
    })
  }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ViewTotal(totalid: number) {


  }

}
