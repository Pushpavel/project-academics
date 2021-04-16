import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService} from 'core/document.service';
import {DEPT_ABBR} from 'lib/constants/dept.constants';
import {mapMapEntries, mapObjectEntries} from 'lib/utils/native/map.utils';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {getParams} from 'app/routes/routing.helper';

@Component({
  selector: 'app-batch-result-page',
  templateUrl: './batch-result-page.component.html',
  styleUrls: ['./batch-result-page.component.scss']
})
export class BatchResultPageComponent {

  allDepartments = Object.values(DEPT_ABBR);

  params = getParams(['semId', 'batchId'], this.route);

  selectedDeptId = new BehaviorSubject<string>(Object.keys(DEPT_ABBR)[0]);

  submissionOverview = this.params.pipe(
    switchMap(params => this.documentService.getDeptwiseDocSubmissionOverview(params.semId, params.batchId)),
    // Append % to percentage values
    map(deptStats => mapMapEntries(deptStats, (key, val) => [key, val + '%']))
  );

  courseStats: Observable<CourseStatUI[]> = this.params.pipe(
    switchMap(params =>
      this.selectedDeptId.pipe(
        switchMap(deptId => this.documentService.getCourseDocStats({...params, deptId}))
      )
    ),
    map(courseStats => courseStats.map(courseStat => {
      if (!courseStat)
        throw new Error('CourseStat does not Exists !'); // TODO: handle gracefully
      const stats = new Map(mapObjectEntries(courseStat.stats, (_, stat) => [stat.documentName, stat.status]));
      const statsAndCourseCode = new Map([['CODE', courseStat.courseCode], ...stats.entries()]);

      return {
        courseCode: courseStat.courseCode,
        courseName: courseStat.courseName,
        statsAndCourseCode,
      } as CourseStatUI;
    }))
  );

  chooseSubject(c: number) {
    this.selectedDeptId.next(Object.keys(DEPT_ABBR)[c]);
  }

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
  ) {
  }
}

interface CourseStatUI {
  courseCode: string,
  courseName: string,
  statsAndCourseCode: Map<string, string>,
}
