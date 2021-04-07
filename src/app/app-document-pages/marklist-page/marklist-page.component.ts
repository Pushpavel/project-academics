import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {ListSink} from '@lib/data-adapters/base/sink.interfaces';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {MarklistDocumentId} from '@lib/models/document/document-base.model';
import {CoursePath, DocumentPath} from '@lib/models/path.model';
import {MarklistEntryRaw, MarklistEntryUI} from '@lib/models/document/marklist.model';
import {marklistEntriesUIModel} from '@lib/data-adapters/combine/marklist.combine';

@Component({
  selector: 'app-marklist-page',
  templateUrl: './marklist-page.component.html',
  styleUrls: ['./marklist-page.component.scss'],
})
export class MarklistPageComponent extends DocumentPage implements OnInit, OnDestroy {


  entries = this.params.pipe(
    switchMap(params => {
      // build Course Path
      const p: CoursePath = {semId: params.semId, courseCode: params.courseCode};

      // get dependencies
      const entries$ = this.documentService.getPrivateDocumentEntries<MarklistEntryRaw>(p, params.documentId as MarklistDocumentId);
      const studentNames$ = this.documentService.getStudentNames(p);

      // build ui model
      return combineLatest([entries$, studentNames$]).pipe(
        map((deps) => marklistEntriesUIModel(deps))
      );

    })
  );

  entrySink: ListSink<MarklistEntryRaw, 'rollNo'> = new Subject();

  subs = new Subscription();

  onEdit(key: string, row: MarklistEntryUI, event: Event) {
    this.entrySink.next({
      rollNo: row.rollNo,
      [key]: (event.target as HTMLInputElement).valueAsNumber
    });
  }

  ngOnInit(): void {
    //  Setup Sinks
    const sub = combineLatest([this.editable, this.params])
      .subscribe(([editable, params]) => {
        const p: DocumentPath<MarklistDocumentId> = {
          semId: params.semId,
          courseCode: params.courseCode,
          documentId: params.documentId as MarklistDocumentId
        };

        if (editable)
          this.documentService.sinkPrivateDocumentEntry(p, this.entrySink);
      });

    this.subs.add(sub);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
