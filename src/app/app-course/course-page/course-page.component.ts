import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {CourseService} from '@service/course.service';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent {

  params = getParams(['semId', 'courseCode'], this.route);

  course = this.params.pipe(
    switchMap(params => this.courseService.getCourseDetail(params.semId, params.courseCode)),
  );

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {
  }

}
