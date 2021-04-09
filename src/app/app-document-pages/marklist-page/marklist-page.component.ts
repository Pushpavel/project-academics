import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {Sink} from '@lib/data-adapters/base/sink.interfaces';
import {combineLatest, Subscription} from 'rxjs';
import {MarklistDocumentId} from '@lib/models/document/document-base.model';
import {MarklistEntryRaw, MarklistEntryUI} from '@lib/models/document/marklist.model';
import {marklistEntriesUIModel} from '@lib/data-adapters/combine/marklist.combine';

@Component({
  selector: 'app-marklist-page',
  templateUrl: './marklist-page.component.html',
  styleUrls: ['./marklist-page.component.scss'],
  host:{class:'document-page'}
})
export class MarklistPageComponent extends DocumentPage implements OnInit, OnDestroy {


  entries = this.params.pipe(
    switchMap(p => {

      // get dependencies
      const entries$ = this.documentService.getPrivateDocumentEntries<MarklistEntryRaw>(p, p.documentId as MarklistDocumentId);
      const studentNames$ = this.documentService.getStudentNames(p);

      // build ui model
      return combineLatest([entries$, studentNames$]).pipe(
        map((deps) => marklistEntriesUIModel(deps))
      );

    })
  );

  entrySink = new Sink<MarklistEntryRaw, 'rollNo'>();

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
      .subscribe(([editable, p]) => {
        if (editable)
          this.documentService.sinkPrivateDocumentEntry(p, p.documentId as MarklistDocumentId, this.entrySink);
      });

    this.subs.add(sub);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
