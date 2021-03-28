import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {DocumentService} from '@service/document.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {mapMapEntries} from '@lib/utils/other.util';
import {DOCUMENT_STATUS_NAMES} from '@lib/constants/document.constants';
import {DEPT_ABBR} from '@lib/constants/dept.constants';

@Component({
  selector: 'app-batch-result-page',
  templateUrl: './batch-result-page.component.html',
  styleUrls: ['./batch-result-page.component.scss']
})
export class BatchResultPageComponent {

  batchId = this.route.paramMap.pipe(
    map(params => params.get('batch_id') ?? 'Error'),    // Todo: Handle if batch_id is null
    shareReplay(1)
  );

  submissionOverview = this.batchId.pipe(
    switchMap(batchId => this.documentService.getDeptwiseDocSubmissionOverview(batchId)),
    // Append % to percentage values
    map(deptStats => mapMapEntries(deptStats, (key, val) => [key, val + '%']))
  );


  selectedDeptId = new BehaviorSubject<string>(Object.keys(DEPT_ABBR)[0]);

  courseStats: Observable<CourseStatUI[]> = this.batchId.pipe(
    switchMap(batchId =>
      this.selectedDeptId.pipe(
        switchMap(deptId => this.documentService.getCourseDocStats({batchId, deptId}))
      )
    ),
    map(courseStats => courseStats.map(courseStat => {
      const stats = mapMapEntries(courseStat.stats, (_, stat) => [stat.name, DOCUMENT_STATUS_NAMES[stat.status]]);
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
