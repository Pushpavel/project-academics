import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseGridComponent } from './course-grid/course-grid.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CourseCardComponent } from './course-card/course-card.component';
import  {MatCardModule, } from '@angular/material/card';
import  { MatRippleModule, } from '@angular/material/core';
import  { MatButtonModule, } from '@angular/material/button';
import  { MatIconModule, } from '@angular/material/icon';
import { BatchGridComponent } from './batch-grid/batch-grid.component'

@NgModule({
  declarations: [
    CourseGridComponent,
    HomePageComponent,
    CourseCardComponent,
    BatchGridComponent,],
  imports: [  
    CommonModule,
    MatCardModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule
  ]
  
})
export class HomeModule { }
