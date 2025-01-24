import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sumb-button',
  standalone: true,

  templateUrl: './sumb-button.component.html',
  styleUrls: ['./sumb-button.component.css'],
  imports: [
        CommonModule,FormsModule, RouterModule
      ],
})
export class SumbButtonComponent {

  @Input() label:string
  @Input() label2:string
  @Output() onClick:EventEmitter<void> = new EventEmitter<void>();
  emitClick(){
    this.onClick.emit()
  }
}
