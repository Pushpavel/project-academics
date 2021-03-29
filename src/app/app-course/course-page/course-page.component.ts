import {Component} from '@angular/core';
import {PageLayout} from '../../shared/helpers/PageLayout';
import {PageService} from '@service/page.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {CourseService} from '@service/course.service';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent extends PageLayout {

  params = getParams(['semId', 'courseCode'], this.route);

  course = this.params.pipe(
    switchMap(params => this.courseService.getCourse(params.semId, params.courseCode)),
  );

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    page: PageService,
  ) {
    super(page);
  }

}
