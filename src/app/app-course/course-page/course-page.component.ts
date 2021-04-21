import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {CourseService} from 'core/course.service';
import {UserCourseRelation} from '../../../lib/models/course.model';
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

  courseCR = this.route.data.pipe(map(data => data.userCrResolve as UserCourseRelation));

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {
  }

}
