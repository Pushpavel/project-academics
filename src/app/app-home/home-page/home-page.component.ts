import { Component, OnInit } from '@angular/core';
import { Course, CourseCollection } from '../../../lib/models/course.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

 

  //dummy data
  title : String = "Courses that You manage"
  coursesList : Course[] = [ 
    {CourseName : "Computer Networks", courseId : "CS201"},
    {CourseName : "Computer Networks", courseId : "CS201"},
    {CourseName : "Computer Networks", courseId : "CS201"},
    {CourseName : "Computer Networks", courseId : "CS201"},
    
  ]

  batchList : CourseCollection[] = [
    { title : this.title, courses : this.coursesList },
    { title : this.title, courses : this.coursesList },
    { title : this.title, courses : this.coursesList },
  ] 

  ngOnInit(): void {
  }

  handleArchive(){
    console.log("archive"); 
  }


}
