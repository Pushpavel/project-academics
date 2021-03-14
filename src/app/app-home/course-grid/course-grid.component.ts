import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@lib/models/course.model';

@Component({
  selector: 'course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss'],
})
export class CourseGridComponent implements OnInit {

  @Input() title : String = "Courses that you manage"
  @Input() courses : Course[] = [{'CourseName': 'Computer Networks', 'courseId': 'CS202'},{'CourseName': 'Computer Networks', 'courseId': 'CS202'},{'CourseName': 'Computer Networks', 'courseId': 'CS202'},{'CourseName': 'Computer Networks', 'courseId': 'CS202'}]

  constructor() { }

  ngOnInit(): void {
  }

}
