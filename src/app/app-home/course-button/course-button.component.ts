import {Component, Input, OnInit} from '@angular/core';
import {CourseDetailRaw} from '@lib/models/document/course.model';

@Component({
  selector: 'course-button',
  templateUrl: './course-button.component.html',
  styleUrls: ['./course-button.component.scss'],
})
export class CourseButtonComponent implements OnInit {


  @Input() course!: CourseDetailRaw


  constructor() {
  }

  ngOnInit(): void {
  }

  handleCourseChoosen() {
    console.log(this.course.courseCode);

  }

}
