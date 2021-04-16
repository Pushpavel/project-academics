import { Component, Input, OnInit } from '@angular/core';
import { CourseDetailRaw } from '@models/course.model';

@Component({
  selector: 'course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss'],
})
export class CourseGridComponent implements OnInit {

  @Input() title !: String
  @Input() courses !: CourseDetailRaw[]
  @Input() showDownload: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
