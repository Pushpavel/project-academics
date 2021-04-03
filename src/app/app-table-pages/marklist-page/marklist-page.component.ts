import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {switchMap} from 'rxjs/operators';
import {ListSink} from '@lib/data-adapters/base/sink.interfaces';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {MarklistDocumentId} from '@lib/models/document.model';
import {DocumentPath} from '@lib/models/path.model';
import {MarklistEntryRaw, MarklistEntryUI} from '@lib/models/marklist.model';

@Component({
  selector: 'app-marklist-page',
  templateUrl: './marklist-page.component.html',
  styleUrls: ['./marklist-page.component.scss']
})
export class MarklistPageComponent extends DocumentPage implements OnInit, OnDestroy {

  entries = this.params.pipe(
    switchMap(params => this.documentService.getPrivateMarklistEntries({
      semId: params.semId,
      courseCode: params.courseCode,
      documentId: params.documentId as MarklistDocumentId
    }))
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
