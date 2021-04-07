import { Component, Input, OnInit } from '@angular/core';
import { CourseDetailRaw } from '@lib/models/document/course.model';

@Component({
  selector: 'course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss'],
})
export class CourseGridComponent implements OnInit {

  @Input() title !: String
  @Input() courses !: CourseDetailRaw[]

  constructor() { }

  ngOnInit(): void {
    console.log(this.title,this.courses);
  }

}
