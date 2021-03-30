import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService, DocumentEntry} from '@service/document.service';
import {getParams} from '../../routes/routing.helper';
import {switchMap, tap} from 'rxjs/operators';
import {DocumentMeta, DocumentId, DocumentStat} from '@lib/models/document.model';
import {of, Subject} from 'rxjs';
import {ColumnSetting} from '../../mdc-helper/mdc-table/mdc-table.component';
import {DOCUMENT_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent implements OnDestroy {

  columns: ColumnSetting<DocumentEntry>[] = [];
  stat?: DocumentStat;
  meta?: DocumentMeta;
  entries = new Subject<DocumentEntry[]>();

  subscription = getParams(['semId', 'courseCode', 'documentId'], this.route)
    .pipe(
      tap(params => this.columns = DOCUMENT_COLUMN_SETTINGS[params.documentId as DocumentId]),
      switchMap(params => this.documentService.getStat(params.semId, params.courseCode, params.documentId)),
      tap(stat => this.stat = stat),
      // Todo: query with UserService about the access level and compare them with stat.status
      switchMap(stat => this.documentService.getMeta(stat.semId, stat.courseCode, stat.id, false)),
      tap(meta => this.meta = meta),
      switchMap(_ => {
        if (!this.stat) return of(null);
        return this.documentService.getEntries(this.stat.semId, this.stat.courseCode, this.stat.id, false);
      }),
      tap(entries => this.entries.next(entries ?? [])),
    ).subscribe();


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
  ) {
  }

}
