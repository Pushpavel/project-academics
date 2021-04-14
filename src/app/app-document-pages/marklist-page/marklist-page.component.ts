import {Component} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {Sink} from '@lib/data/base/sink.interfaces';
import {combineLatest, of} from 'rxjs';
import {MarklistDocumentId} from '@models/document/document-base.model';
import {MarklistEntryRaw, MarklistEntryUI} from '@models/document/marklist.model';
import {marklistEntriesUIModel} from '@lib/data/combine/marklist.combine';
import {sortByKey} from '@utils/rxjs.utils';

@Component({
  selector: 'app-marklist-page',
  templateUrl: './marklist-page.component.html',
  styleUrls: ['./marklist-page.component.scss'],
  host: {class: 'document-page'}
})
export class MarklistPageComponent extends DocumentPage {

  entries = this.params.pipe(
    switchMap(p => {

      // get dependencies
      const entries$ = this.documentService.getPrivateDocumentEntries<MarklistEntryRaw>(p, p.documentId as MarklistDocumentId);
      const studentNames$ = this.documentService.getStudentNames(p).pipe(
        map(names => {
          if (!names)
            throw new Error('StudentNames does not exists'); // TODO: handle gracefully
          return names;
        })
      );

      // build ui model
      return combineLatest([entries$, studentNames$]).pipe(
        map(marklistEntriesUIModel),
        sortByKey('rollNo'),
      );
    })
  );

  entrySink = new Sink<MarklistEntryRaw, 'rollNo'>();

  setupSink = combineLatest([this.editable, this.params]).pipe(
    switchMap(([editable, p]) => {
      if (editable)
        return this.documentService.sinkPrivateDocumentEntry(p, p.documentId as MarklistDocumentId, this.entrySink);

      return of(null);
    })
  ).subscribe();

  onEdit(key: string, row: MarklistEntryUI, event: Event) {
    this.entrySink.next({
      rollNo: row.rollNo,
      [key]: (event.target as HTMLInputElement).valueAsNumber
    });
  }

}
