import { Component, OnInit } from '@angular/core';
import { ticket } from '../interface/ticket.interface';
import { total } from '../interface/total.interfaces';
import { TotalTicketService } from '../services/total-ticket.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { product } from '../interface/product.interface';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Store } from '../interface/store.interface';
import { DelButtonComponent } from '../beauty-components/del-button/del-button.component';
import { ViewButtonComponent } from '../beauty-components/view-button/view-button.component';

@Component({
  selector: 'main',
  templateUrl: './ticket.component.html',
    standalone:true,
    imports: [
  CommonModule,FormsModule, RouterModule,ViewButtonComponent
    ]
})

export class TicketComponent  implements OnInit {

  //Pre-load
  ngOnInit() {
    this.gettotal();
    this.gettickets();
    this.getproducts();
    this.getstore();
  }

  //Tables
  tableItemsTotal: Array<{​product_ID:number,total_Id:number,amount:number,price:number }> = [];
  tableItemsTicket: Array<{id:number,price:number,date:Date, iD_Store:number, Name:string }> = [];

  tabletoadd: Array<{id:number, name:string,price:number,amount:number}> = [];


  //include totalticketservice
  constructor(private TotalTicketService:TotalTicketService, private http:HttpClient, private ProductService:ProductService) { }

  //include interface arrays
  private products:product[] = [];
  private arrticket:ticket[] = [];
  private arrtotal:total[] = [];
  private arrstore:Store[] = [];

  selectedTotal:number | null= null;
  selectedTicket:number | null = null;
  selectedStore:string = '';

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET TOTAL&TICKET INFO++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  gettotal(){
    this.TotalTicketService.gettotal().subscribe((d) => {
      console.log(d);
      this.arrtotal = d;
      this.tableItemsTotal = d
    })
  }

  gettickets() {
    this.TotalTicketService.getticket().subscribe((d) => {
      console.log(d);
      this.arrticket = d;

      this.tableItemsTicket = d.map(ticket => {
        return {
          id: ticket.id,
          price: ticket.price,
          date: ticket.date,
          iD_Store: ticket.store.iD_Store,
          Name: ticket.store.name
        };
      });
    });
  }

  getproducts(){
    this.ProductService.getall().subscribe((d) => {
      console.log(d);
      this.products = d;
    })
  }

  getstore(){
    this.ProductService.getstore().subscribe((d) => {
      console.log(d);
      this.arrstore = d;
    })
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  ViewTotal(totalid: number) {
    this.selectedTicket = totalid;

    const ticket = this.tableItemsTicket.find(i => i.id === totalid);

    this.selectedStore = this.arrstore.find(s => s.iD_Store === ticket?.iD_Store)?.name || '';

    //clear table
    this.tabletoadd = [];

    //select items wich is equal to totalid
    const selectedTotals = this.tableItemsTotal.filter(item => item.total_Id === totalid);

    selectedTotals.forEach(totalItem => {

      const productName = this.products.find(product => product.id === totalItem.product_ID)?.name;

      // add to table
      if (productName) {

        this.tabletoadd.push({
          id: totalItem.product_ID,
          name: productName,
          price: totalItem.price,
          amount: totalItem.amount,
        });
      }
    });
    
    console.log('Updated tabletoadd:', this.tabletoadd);
  }


}

