import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss']
})
export class CourseGridComponent implements OnInit {

  private title : String = "Courses that you manage'"

  constructor() { }

  ngOnInit(): void {
  }

}
