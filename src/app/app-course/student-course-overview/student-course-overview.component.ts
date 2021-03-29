import {Component} from '@angular/core';
import {StudentAttendanceEntry, StudentMarkEntry} from '@lib/models/student.model';
import {StudentService} from '@service/student.service';
import {ActivatedRoute} from '@angular/router';
import {getParams} from '../../routes/routing.helper';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'student-course-overview',
  templateUrl: './student-course-overview.component.html',
  styleUrls: ['./student-course-overview.component.scss']
})
export class StudentCourseOverviewComponent {

  params = getParams(['semId', 'courseCode'], this.route);

  courseOverview = this.params.pipe(
    switchMap(params =>
      // TODO: Get roll no from user service
      this.studentService.getCourseOverview(params.semId, 'CS19B1042', params.courseCode)
    )
  );

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
  ) {
  }

}

export interface CourseOverviewUI {
  attendanceEntry: StudentAttendanceEntry,
  markEntries: StudentMarkEntry[],
}
