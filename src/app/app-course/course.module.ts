import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {MatCardModule, } from '@angular/material/card';
import  { MatRippleModule, } from '@angular/material/core';
import { CourseCardComponent } from './course-card/course-card.component';



@NgModule({
  declarations: [CourseCardComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatCardModule,
  ],
  exports : [CourseCardComponent]
})
export class CourseModule { }
