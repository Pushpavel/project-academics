import {Component} from '@angular/core';
import {StudentUI} from '@models/student.model';
import {StudentService} from 'core/student.service';
import {ActivatedRoute} from '@angular/router';
import {combineLatest} from 'rxjs';
import {UserService} from '../../../core/user.service';
import {DOCUMENT_NAMES, MARK_DOCUMENT_IDS, PUBLIC_DOCUMENT_IDS} from '../../../lib/constants/document.constants';
import {getParams} from '../../routes/routing.helper';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'student-course-overview',
  templateUrl: './student-course-overview.component.html',
  styleUrls: ['./student-course-overview.component.scss']
})
export class StudentCourseOverviewComponent {

  DOCUMENT_NAMES = DOCUMENT_NAMES;
  params = getParams(['semId', 'courseCode'], this.route);

  rollNo = this.user.loggedInUser.pipe(map(u => u.uid));

  student = combineLatest([this.rollNo, this.params]).pipe(
    switchMap(([rollNo, params]) => this.studentService.getStudentEntries({...params, rollNo})),
    map(entries => entries[0]),
    map(entry => {
      const ui = {...entry} as any;

      for (const id of PUBLIC_DOCUMENT_IDS) {
        ui.entries[id] = entry.entries[id] ?? {};
        ui.entries[id].documentId = id;
      }
      return ui as StudentUI;
    })
  );

  attendanceEntry = this.student.pipe(map(student => student.entries.ATTENDANCE));

  markEntries = this.student.pipe(map(student => MARK_DOCUMENT_IDS.map(id => student.entries[id])));

  percent(val?: number, total?: number) {
    if (val != undefined && total != undefined)
      return (Math.round((!total ? 0 : val / total) * 10000) / 100) + '%';
    return undefined;
  }

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private user: UserService,
  ) {
  }

}
