import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {CourseService} from 'core/course.service';
import {getParams} from '../../routes/routing.helper';
import {UserCrData} from '../../routes/user-cr.resolver';

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

  courseCR = this.route.data.pipe(map((data) => (data.userCrResolve as UserCrData).userCR));

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {
  }

}
