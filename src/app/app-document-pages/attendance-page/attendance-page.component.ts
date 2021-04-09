import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {Sink} from '@lib/data-adapters/base/sink.interfaces';
import {AttendanceEntryRaw, AttendanceEntryUI} from '@lib/models/document/attendance.model';
import {combineLatest, Subscription} from 'rxjs';
import {attendanceEntriesUIModel} from '@lib/data-adapters/combine/attendance.combine';
import {PrivateMetaRaw} from '@lib/models/document/document-base.model';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss'],
  host: {class: 'document-page'}
})
export class AttendancePageComponent extends DocumentPage implements OnInit, OnDestroy {

  entries = this.params.pipe(
    switchMap(p => {
      // get dependencies
      const entries$ = this.documentService.getPrivateDocumentEntries<AttendanceEntryRaw>(p, 'ATTENDANCE');
      const studentNames$ = this.documentService.getStudentNames(p);

      // build ui model
      return combineLatest([entries$, studentNames$, this.meta]).pipe(map(deps => attendanceEntriesUIModel(deps)));
    })
  );

  entrySink = new Sink<AttendanceEntryRaw, 'rollNo'>();
  metaSink = new Sink<PrivateMetaRaw>();

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
      .subscribe(([editable, p]) => {

        if (editable) {
          this.documentService.sinkPrivateDocumentEntry(p, 'ATTENDANCE', this.entrySink);
          this.documentService.sinkPrivateDocumentMeta(p, this.metaSink);
        }
      });

    this.subs.add(sub);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
