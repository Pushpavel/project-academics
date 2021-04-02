import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPageComponent} from '../document-page/document-page.component';
import {switchMap} from 'rxjs/operators';
import {Sink} from '@lib/data-adapters/base/sink.interfaces';
import {AttendanceEntryRaw, AttendanceEntryUI} from '@lib/models/attendance.model';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {EditEvent} from '../../mdc-helper/mdc-table/mdc-table.component';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss']
})
export class AttendancePageComponent extends DocumentPageComponent implements OnInit, OnDestroy {

  entries = this.params.pipe(
    switchMap(params => this.documentService.getPrivateAttendanceEntries({
      semId: params.semId,
      courseCode: params.courseCode
    }))
  );

  entrySink: Sink<AttendanceEntryRaw, 'rollNo'> = new Subject();
  subs = new Subscription();

  onEdit({key, row}: EditEvent<AttendanceEntryUI>) {
    this.entrySink.next({
      rollNo: row.rollNo,
      [key]: row[key]
    });
  }

  ngOnInit(): void {

    //  Setup Sinks
    const sub = combineLatest([this.editable, this.params])
      .subscribe(([editable, params]) => {
        if (editable)
          this.documentService.sinkPrivateDocumentEntry({
            semId: params.semId,
            courseCode: params.courseCode,
            documentId: 'ATTENDANCE'
          }, this.entrySink);
      });

    this.subs.add(sub);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
