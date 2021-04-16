import {Component} from '@angular/core';
import {Sink} from '../../../lib/data/base/sink.interfaces';
import {attendanceEntriesFromProtectedMeta, attendanceEntriesUIModel} from '../../../lib/data/combine/attendance.combine';
import {sortByKey} from '../../../lib/utils/rxjs.utils';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {AttendanceEntryRaw, AttendanceEntryUI, AttendanceMetaRaw, ProtectedAttendanceMetaRaw} from '@models/document/attendance.model';
import {combineLatest, Observable, of} from 'rxjs';
import {isPrivateMeta, PrivateMetaRaw} from '@models/document/document-base.model';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss'],
  host: {class: 'document-page'}
})
export class AttendancePageComponent extends DocumentPage {

  entries = combineLatest([this.params, this.meta]).pipe(
    switchMap(([p, meta]) => {
      if (!meta)
        throw new Error('Meta is Null'); // TODO: handle this
      if (isPrivateMeta(meta))
        return this.documentService.getPrivateDocumentEntries<AttendanceEntryRaw>(p, 'ATTENDANCE');

      return of(attendanceEntriesFromProtectedMeta(meta as ProtectedAttendanceMetaRaw));
    }),
    switchMap(entries => {
      const studentNames = this.params.pipe(
        switchMap(p => this.documentService.getStudentNames(p)),
        map(names => {
          if (!names)
            throw new Error('StudentNames does not exists'); // TODO: handle gracefully
          return names;
        })
      );

      return combineLatest([of(entries), studentNames, this.meta as Observable<AttendanceMetaRaw>]);
    }),
    map(attendanceEntriesUIModel),
    sortByKey('rollNo'),
  );


  entrySink = new Sink<AttendanceEntryRaw, 'rollNo'>();
  metaSink = new Sink<PrivateMetaRaw>();


  sinkResponse = combineLatest([this.editable, this.params]).pipe(
    switchMap(([editable, p]) => {
      if (editable)
        return combineLatest([
          this.documentService.sinkPrivateDocumentEntry(p, 'ATTENDANCE', this.entrySink),
          this.documentService.sinkPrivateDocumentMeta(p, this.metaSink)
        ]);
      else
        return of(null);
    })
  ).subscribe();


  onTotalChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.metaSink.next({
      total: target.valueAsNumber
    });
  }

  onEdit(key: string, row: AttendanceEntryUI, event: Event) {
    this.entrySink.next({
      rollNo: row.rollNo,
      [key]: (event.target as HTMLInputElement).valueAsNumber
    });
  }

}
