import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-button',
  standalone: true,

  templateUrl: './view-button.component.html',
  styleUrls: ['./view-button.component.css'],
  imports:[
    CommonModule,FormsModule,RouterModule
  ]
})
export class ViewButtonComponent {

  @Input() label:string
  @Output() onClick:EventEmitter<void> = new EventEmitter<void>();
  emitClick(){
    this.onClick.emit()
  }
}

