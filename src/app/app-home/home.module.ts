import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseGridComponent } from './course-grid/course-grid.component';
import { CourseModule } from 'app/app-course/course.module';
import { HomePageComponent } from './home-page/home-page.component';
import { CourseCardComponent } from 'app/app-course/course-card/course-card.component';



@NgModule({
  declarations: [
    CourseGridComponent,
    HomePageComponent,],
  imports: [  
    CommonModule,
    CourseModule,
  ]
})
export class HomeModule { }
