import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@lib/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  
  @Input() course : Course = {"CourseName" : "Computer Networks", "courseId" : "CS202"}


  constructor() { }

  ngOnInit(): void {
  }

  handleCourseChoosen(){
    console.log(this.course.courseId);
    
  }

}
