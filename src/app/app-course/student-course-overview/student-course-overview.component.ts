import {Component} from '@angular/core';
import {StudentAttendanceEntry, StudentEntryZZZ, StudentMarkEntry, StudentUI} from '@models/student.model';
import {StudentService} from 'core/student.service';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {UserService} from '../../../core/user.service';
import {DOCUMENT_NAMES, MARK_DOCUMENT_IDS} from '../../../lib/constants/document.constants';
import {AttendanceEntryZZZ} from '../../../lib/models/document/attendance.model';
import {PublicDocumentId} from '../../../lib/models/document/document-base.model';
import {getParams} from '../../routes/routing.helper';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'student-course-overview',
  templateUrl: './student-course-overview.component.html',
  styleUrls: ['./student-course-overview.component.scss']
})
export class StudentCourseOverviewComponent {

  params = getParams(['semId', 'courseCode'], this.route);
  DOCUMENT_NAMES = DOCUMENT_NAMES;

  rollNo = this.user.loggedInUser.pipe(map(u => u?.uid ?? 'ERROR')); // TODO: handle this

  student = combineLatest([this.rollNo, this.params]).pipe(
    switchMap(([rollNo, params]) => this.studentService.getStudentEntries({...params, rollNo})),
    map(entries => entries[0]),
    map(entry => {
      const ui = {...entry} as any;

      for (const e of Object.keys(entry.entries) as PublicDocumentId[]) {
        ui.entries[e] = entry.entries[e] ?? {};
        ui.entries[e].documentId = e;
      }
      return ui as StudentUI;
    })
  );

  attendanceEntry = this.student.pipe(map(student => student.entries.ATTENDANCE));

  markEntries = this.student.pipe(map(student => MARK_DOCUMENT_IDS.map(id => student.entries[id])));

  attendanceCardTitle = 'ATTENDANCE';

  percent(val?: number, total?: number) {
    if (val != undefined && total != undefined)
      return Math.round((!total ? 0 : val / total) * 100) / 100;
    return undefined;
  }

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private user: UserService,
  ) {
  }

}

export interface CourseOverviewUI {
  attendanceEntry: StudentAttendanceEntry,
  markEntries: StudentMarkEntry[],
}
