import {Component} from '@angular/core';
import {PageLayout} from '../../shared/helpers/PageLayout';
import {PageService} from '@service/page.service';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {CourseService} from '@service/course.service';
import {DOCUMENT_GROUPS} from '@lib/constants/document.constants';
import {CourseDocumentStat} from '@lib/models/course.model';
import {Observable} from 'rxjs';

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


  docStats: Observable<DocumentGroupUI[]> = this.courseCode.pipe(
    switchMap(courseCode => this.courseService.getCourseDocumentStats(courseCode)),
    map(docs => DOCUMENT_GROUPS.map(group => {
      // map ids of document in each document group to CourseDocumentStat
      const actions = group.actions
        .map(id => docs.find(doc => doc.id == id))
        .filter(val => val != undefined) as CourseDocumentStat[];

      return {...group, actions};
    })),
  );

  constructor(page: PageService, private route: ActivatedRoute, private courseService: CourseService) {
    super(page);
  }

  openDocument(docId: string) {
    // TODO: navigate to document
  }

}

export interface DocumentGroupUI {
  title: string,
  actions: CourseDocumentStat[]
}
