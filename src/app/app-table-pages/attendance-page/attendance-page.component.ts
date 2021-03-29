import {Component} from '@angular/core';
import {AttendanceDocMeta, AttendanceEntry} from '@lib/models/attendance.model';
import {DocumentService} from '@service/document.service';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {ATTENDANCE_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss']
})
export class AttendancePageComponent {

  params = getParams(['semId', 'courseCode'], this.route);

  documentStat = this.params.pipe(
    switchMap(params => this.documentService.getStat(params.semId, params.courseCode, 'ATTENDANCE')),
    shareReplay(1),
  );

  documentData = this.documentStat.pipe(
    // Todo: query with UserService about the access level and compare them with doc.status
    switchMap(doc =>
      this.documentService.getMeta<AttendanceDocMeta>(doc.semId, doc.courseCode, doc.id, false).pipe(
        map(meta => ({stat: doc, meta}))
      )
    ),
  );

  attendanceEntries = this.params.pipe(
    switchMap(params =>
      this.documentService.getEntries<AttendanceEntry>(params.semId, params.courseCode, 'ATTENDANCE', false)
    ),
  );

  columns = ATTENDANCE_COLUMN_SETTINGS;

  constructor(private documentService: DocumentService, private route: ActivatedRoute) {
  }

}
