import {Component, Input, OnInit} from '@angular/core';
import {Course} from '@lib/models/course.model';

@Component({
  selector: 'course-button',
  templateUrl: './course-button.component.html',
  styleUrls: ['./course-button.component.scss'],
})
export class CourseButtonComponent implements OnInit {


  @Input() course!: Course


  constructor() {
  }

  ngOnInit(): void {
  }

  handleCourseChoosen() {
    console.log(this.course.courseId);

  }

}
