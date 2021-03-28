import {Component} from '@angular/core';
import {PageLayout} from '../../shared/helpers/PageLayout';
import {PageService} from '@service/page.service';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {CourseService} from '@service/course.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent extends PageLayout {

  courseCode = this.route.paramMap.pipe(
    map(params => params.get('course_code') ?? 'Error'),    // Todo: Handle if course_code is null
    shareReplay(1),
  );

  course = this.courseCode.pipe(
    switchMap(courseCode => this.courseService.getCourse(courseCode)),
  );

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    page: PageService,
  ) {
    super(page);
  }

}
