import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {DocumentService} from '@service/document.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {mapMapEntries} from '@lib/utils/other.util';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'app-batch-result-page',
  templateUrl: './batch-result-page.component.html',
  styleUrls: ['./batch-result-page.component.scss']
})
export class BatchResultPageComponent {

  params = getParams(['semId', 'batchId'], this.route);

  submissionOverview = this.params.pipe(
    switchMap(params => this.documentService.getDeptwiseDocSubmissionOverview(params.semId, params.batchId)),
    // Append % to percentage values
    map(deptStats => mapMapEntries(deptStats, (key, val) => [key, val + '%']))
  );


  selectedDeptId = new BehaviorSubject<string>(Object.keys(DEPT_ABBR)[0]);

  courseStats: Observable<CourseStatUI[]> = this.params.pipe(
    switchMap(params =>
      this.selectedDeptId.pipe(
        switchMap(deptId => this.documentService.getCourseDocStats({...params, deptId}))
      )
    ),
    map(courseStats => courseStats.map(courseStat => {
      const stats = mapMapEntries(courseStat.stats, (_, stat) => [stat.documentName, stat.status]);
      const statsAndCourseCode = new Map([['CODE', courseStat.courseCode], ...stats.entries()]);

      return {
        courseCode: courseStat.courseCode,
        courseName: courseStat.courseName,
        statsAndCourseCode,
      } as CourseStatUI;
    }))
  );

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
