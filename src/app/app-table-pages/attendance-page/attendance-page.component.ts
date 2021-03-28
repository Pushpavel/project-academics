import {Component} from '@angular/core';
import {AttendanceDocMeta, AttendanceEntry} from '@lib/models/attendance.model';
import {DocumentService} from '@service/document.service';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {ATTENDANCE_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss']
})
export class AttendancePageComponent {

  courseCode = this.route.paramMap.pipe(
    map(params => params.get('course_code') ?? 'Error'),    // Todo: Handle if course_code is null
    shareReplay(1),
  );

  documentStat = this.courseCode.pipe(
    switchMap(courseCode => this.documentService.getStats({courseCode, documentId: 'ATTENDANCE'})),
    map(stats => stats[0]),
    shareReplay(1),
  );

  documentData = this.documentStat.pipe(
    // Todo: query with UserService about the access level and compare them with doc.status
    switchMap(doc =>
      this.documentService.getMeta<AttendanceDocMeta>(doc.courseCode, doc.id, false).pipe(
        map(meta => ({stat: doc, meta}))
      )
    ),
  );

  attendanceEntries = this.courseCode.pipe(
    switchMap(courseCode =>
      this.documentService.getEntries<AttendanceEntry>(courseCode, 'ATTENDANCE', false)
    ),
  );

  columns = ATTENDANCE_COLUMN_SETTINGS;

  constructor(private documentService: DocumentService, private route: ActivatedRoute) {
  }

}
