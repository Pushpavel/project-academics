import {Component, OnInit} from '@angular/core';
import {Sink} from '../../../lib/data/base/sink.interfaces';
import {attendanceEntriesFromProtectedMeta, attendanceEntriesUIModel} from '../../../lib/data/combine/attendance.combine';
import {getValue, sortByKey} from '../../../lib/utils/rxjs.utils';
import {EditEvent} from '../../mdc-helper/mdc-table/mdc-table/mdc-table.component';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {
  AttendanceEntryRaw,
  AttendanceEntryUI,
  PrivateAttendanceMetaRaw,
  ProtectedAttendanceMetaRaw
} from '@models/document/attendance.model';
import {BehaviorSubject, combineLatest, of} from 'rxjs';
import {isPrivateMeta, PrivateMetaRaw} from '@models/document/document-base.model';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss'],
  host: {class: 'document-page'}
})
export class AttendancePageComponent extends DocumentPage<'ATTENDANCE', PrivateAttendanceMetaRaw, ProtectedAttendanceMetaRaw>
  implements OnInit {

  _entries = new BehaviorSubject<AttendanceEntryRaw[]>([]);

  _total = 0;

  studentNames = this.params.pipe(
    switchMap(p => this.documentService.getStudentNames(p)),
    map(names => {
      if (!names)
        throw new Error('StudentNames does not exists'); // TODO: handle gracefully
      return names;
    })
  );

  _entriesUI = combineLatest([this._entries, this.studentNames, this.meta]).pipe(
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


  ngOnInit() {

    combineLatest([this.params, this.meta]).pipe(
      switchMap(([p, meta]) => {
        if (isPrivateMeta(meta)) return this.documentService.getPrivateDocumentEntries<AttendanceEntryRaw>(p);
        return of(attendanceEntriesFromProtectedMeta(meta));
      })
    ).subscribe(this._entries);

    this.meta.subscribe(meta => this._total = meta.total);
  }

  totalChange(event: Event) {
    this._total = (event.target as HTMLInputElement).valueAsNumber;
    console.log(this._total);
    this.metaSink.next({total: this._total});
  }

  onEdit({index, row, target}: EditEvent<AttendanceEntryUI>) {
    const entries = [...this._entries.value];
    entries[index] = {...entries[index], attended: target.valueAsNumber};

    this._entries.next(entries);
    this.entrySink.next({
      rollNo: row.rollNo,
      attended: target.valueAsNumber
    });
  }

  async downloadBtn() {
    const p = await getValue(this.params);
    const entries = await getValue(this._entriesUI);

    this.csvService.downloadDocumentCSV(p, entries, this._total);
  }
}
