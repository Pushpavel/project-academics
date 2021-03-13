import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardComponent } from './mat-card/mat-card.component';



@NgModule({
  declarations: [MatCardComponent],
  exports: [
    MatCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardModule { }
