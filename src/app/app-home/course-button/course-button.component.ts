import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseDetailRaw} from '@lib/models/course.model';

@Component({
  selector: 'course-button',
  templateUrl: './course-button.component.html',
  styleUrls: ['./course-button.component.scss'],
})
export class CourseButtonComponent implements OnInit {


  @Input() course!: CourseDetailRaw


  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  handleCourseButton() {
    console.log(this.course.courseCode);
    this.router.navigate([`course/${this.course.courseCode}`], {relativeTo: this.route.parent});
  }

}
