import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-del-button',
  standalone: true,

  templateUrl: './del-button.component.html',
  styleUrls: ['./del-button.component.css'],
  imports:[
    CommonModule,FormsModule,RouterModule
  ]
})
export class DelButtonComponent {

  @Input() label:string
  @Output() onClick:EventEmitter<void> = new EventEmitter<void>();
  emitClick(){
    this.onClick.emit()
  }

}
