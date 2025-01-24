import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';


@Component({
  selector: 'navbar',
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html',
    standalone:true,
    imports: [
  CommonModule,FormsModule, RouterModule
    ],

})

export class NavbarComponent  {
}
