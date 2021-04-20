import {Component, OnInit} from '@angular/core';
import {EditEvent} from '../../mdc-helper/mdc-table/mdc-table/mdc-table.component';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {Sink} from 'lib/data/base/sink.interfaces';
import {BehaviorSubject, combineLatest, of} from 'rxjs';
import {isPrivateMeta, MarklistDocumentId} from '@models/document/document-base.model';
import {MarklistEntryRaw, MarklistEntryUI, PrivateMarklistMetaRaw, ProtectedMarklistMetaRaw} from '@models/document/marklist.model';
import {marklistEntriesFromProtectedMeta, marklistEntriesUIModel} from 'lib/data/combine/marklist.combine';
import {getValue, sortByKey} from 'lib/utils/rxjs.utils';

@Component({
  selector: 'app-marklist-page',
  templateUrl: './marklist-page.component.html',
  styleUrls: ['./marklist-page.component.scss'],
  host: {class: 'document-page'}
})
export class MarklistPageComponent extends DocumentPage<MarklistDocumentId, PrivateMarklistMetaRaw, ProtectedMarklistMetaRaw>
  implements OnInit {

  _entries = new BehaviorSubject<MarklistEntryRaw[]>([]);

  studentNames = this.params.pipe(
    switchMap(p => this.documentService.getStudentNames(p)),
    map(names => {
      if (!names)
        throw new Error('StudentNames does not exists'); // TODO: handle gracefully
      return names;
    })
  );


  _entriesUI = combineLatest([this._entries, this.studentNames]).pipe(
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

  ngOnInit() {

    combineLatest([this.params, this.meta]).pipe(
      switchMap(([p, meta]) => {
        if (isPrivateMeta(meta))
          return this.documentService.getPrivateDocumentEntries<MarklistEntryRaw>(p);
        return of(marklistEntriesFromProtectedMeta(meta));
      })
    ).subscribe(this._entries);

  }


  onEdit({row, index, target}: EditEvent<MarklistEntryUI>) {
    const entries = [...this._entries.value];
    entries[index] = {...entries[index], mark: target.valueAsNumber};

    this.entrySink.next({
      rollNo: row.rollNo,
      mark: target.valueAsNumber
    });
  }


  async downloadBtn() {
    const p = await getValue(this.params);
    const entries = await getValue(this._entriesUI);
    const meta = await getValue(this.meta);

    this.csvService.downloadDocumentCSV(p, entries, meta.total);
  }


}
