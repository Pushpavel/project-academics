import {Component} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {Sink} from '@lib/data/base/sink.interfaces';
import {AttendanceEntryRaw, AttendanceEntryUI} from '@models/document/attendance.model';
import {combineLatest, of} from 'rxjs';
import {attendanceEntriesUIModel} from '@lib/data/combine/attendance.combine';
import {PrivateMetaRaw} from '@models/document/document-base.model';
import {sortByKey} from '@utils/other.util';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss'],
  host: {class: 'document-page'}
})
export class AttendancePageComponent extends DocumentPage {

  entries = this.params.pipe(
    switchMap(p => {
      // get dependencies
      const entries$ = this.documentService.getPrivateDocumentEntries<AttendanceEntryRaw>(p, 'ATTENDANCE');
      const studentNames$ = this.documentService.getStudentNames(p).pipe(
        map(names => {
          if (!names)
            throw new Error('StudentNames does not exists'); // TODO: handle gracefully
          return names;
        })
      );

      // build ui model
      return combineLatest([entries$, studentNames$, this.meta])
        .pipe(
          map(deps => attendanceEntriesUIModel(deps)),
          sortByKey('rollNo'),
        );
    })
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
