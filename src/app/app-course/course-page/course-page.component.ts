import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {CourseService} from 'core/course.service';
import {UserCourseRelation} from '../../../lib/models/course.model';
import {CoursePath} from '../../../lib/models/path.model';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent {

  params = getParams<CoursePath>(['semId', 'courseCode'], this.route);

  semesterName = this.params.pipe(
    map(p => {
      const [year, even] = p.semId.split('_');
      return (even == '1' ? 'ODD ' : 'EVEN ') + year;
    })
  );

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
