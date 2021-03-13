import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@lib/models/course.model';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss'],
  inputs : ['courses', 'title']
})
export class CourseGridComponent implements OnInit {

  @Input() title : String = "Courses that you manage"
  @Input() courses : Course[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
