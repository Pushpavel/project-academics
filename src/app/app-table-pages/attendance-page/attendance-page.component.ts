import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPageComponent} from '../document-page/document-page.component';
import {switchMap} from 'rxjs/operators';
import {ListSink, Sink} from '@lib/data-adapters/base/sink.interfaces';
import {AttendanceEntryRaw, AttendanceEntryUI} from '@lib/models/attendance.model';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {DocumentMetaRaw} from '@lib/models/document.model';
import {DocumentPath} from '@lib/models/path.model';
import {EditEvent} from '../../mdc-helper/mdc-table/mdc-table.module';

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

  entrySink: ListSink<AttendanceEntryRaw, 'rollNo'> = new Subject();
  metaSink: Sink<DocumentMetaRaw> = new Subject();

  subs = new Subscription();


  onTotalChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.metaSink.next({
      total: target.valueAsNumber
    });
  }

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
        const p: DocumentPath<'ATTENDANCE'> = {
          semId: params.semId,
          courseCode: params.courseCode,
          documentId: 'ATTENDANCE'
        };

        if (editable) {
          this.documentService.sinkPrivateDocumentEntry(p, this.entrySink);
          this.documentService.sinkPrivateDocumentMeta(p, this.metaSink);
        }
      });

    this.subs.add(sub);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
