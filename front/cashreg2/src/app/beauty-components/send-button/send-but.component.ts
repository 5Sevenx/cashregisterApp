import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sendbut',
  styleUrls: ['./send-but.component.css'],
  templateUrl: './send-but.component.html',
    standalone:true,
    imports: [
      CommonModule,FormsModule, RouterModule
    ],

})
export class SendButComponent {

  @Input() label:string
  @Output() onClick:EventEmitter<void> = new EventEmitter<void> ();
  emitClick(){
    this.onClick.emit()
  }

}
