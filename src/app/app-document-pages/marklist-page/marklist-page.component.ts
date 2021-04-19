import {Component} from '@angular/core';
import {EditEvent} from '../../mdc-helper/mdc-table/mdc-table/mdc-table.component';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {Sink} from 'lib/data/base/sink.interfaces';
import {combineLatest, of} from 'rxjs';
import {isPrivateMeta, MarklistDocumentId} from '@models/document/document-base.model';
import {MarklistEntryRaw, MarklistEntryUI, PrivateMarklistMetaRaw, ProtectedMarklistMetaRaw} from '@models/document/marklist.model';
import {marklistEntriesFromProtectedMeta, marklistEntriesUIModel} from 'lib/data/combine/marklist.combine';
import {sortByKey} from 'lib/utils/rxjs.utils';

@Component({
  selector: 'app-marklist-page',
  templateUrl: './marklist-page.component.html',
  styleUrls: ['./marklist-page.component.scss'],
  host: {class: 'document-page'}
})
export class MarklistPageComponent extends DocumentPage<MarklistDocumentId, PrivateMarklistMetaRaw, ProtectedMarklistMetaRaw> {

  entries = combineLatest([this.params, this.meta]).pipe(
    switchMap(([p, meta]) => {
      if (isPrivateMeta(meta))
        return this.documentService.getPrivateDocumentEntries<MarklistEntryRaw>(p);
      return of(marklistEntriesFromProtectedMeta(meta));
    }),
    switchMap(entries => {
      const studentNames = this.params.pipe(
        switchMap(p => this.documentService.getStudentNames(p)),
        map(names => {
          if (!names)
            throw new Error('StudentNames does not exists'); // TODO: handle gracefully
          return names;
        })
      );

      return combineLatest([of(entries), studentNames]);
    }),
    map(marklistEntriesUIModel),
    sortByKey('rollNo'),
  );

  entrySink = new Sink<MarklistEntryRaw, 'rollNo'>();

  setupSink = combineLatest([this.editable, this.params]).pipe(
    switchMap(([editable, p]) => {
      if (editable)
        return this.documentService.sinkPrivateDocumentEntry(p, p.documentId, this.entrySink);

      return of(null);
    })
  ).subscribe();

  onEdit({row, target}: EditEvent<MarklistEntryUI>) {
    this.entrySink.next({
      rollNo: row.rollNo,
      mark: target.valueAsNumber
    });
  }

}
