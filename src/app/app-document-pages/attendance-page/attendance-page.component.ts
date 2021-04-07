import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {ListSink, Sink} from '@lib/data-adapters/base/sink.interfaces';
import {AttendanceEntryRaw, AttendanceEntryUI} from '@lib/models/attendance.model';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {DocumentMetaRaw} from '@lib/models/document.model';
import {CoursePath, DocumentPath} from '@lib/models/path.model';
import {attendanceEntriesUIModel} from '@lib/data-adapters/combine/attendance.combine';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss']
})
export class AttendancePageComponent extends DocumentPage implements OnInit, OnDestroy {

  entries = this.params.pipe(
    switchMap(params => {
      // build course path
      const p: CoursePath = {semId: params.semId, courseCode: params.courseCode};

      // get dependencies
      const entries$ = this.documentService.getPrivateDocumentEntries<AttendanceEntryRaw>(p, 'ATTENDANCE');
      const studentNames$ = this.documentService.getStudentNames(p);

      // build ui model
      return combineLatest([entries$, studentNames$, this.meta]).pipe(
        map(deps => attendanceEntriesUIModel(deps as any))
      );
    })
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

  onEdit(key: string, row: AttendanceEntryUI, event: Event) {
    this.entrySink.next({
      rollNo: row.rollNo,
      [key]: (event.target as HTMLInputElement).valueAsNumber
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
