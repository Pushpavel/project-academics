import { Component, Input, OnInit } from '@angular/core';
import { CourseDetail } from '@lib/models/course.model';

@Component({
  selector: 'course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss'],
})
export class CourseGridComponent implements OnInit {

  @Input() title !: String
  @Input() courses !: CourseDetail[]

  constructor() { }

  ngOnInit(): void {
    console.log(this.title,this.courses);
  }

}
