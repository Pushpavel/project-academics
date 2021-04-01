import {Directive} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService} from '@service/document.service';
import {getParams} from '../../routes/routing.helper';
import {shareReplay, switchMap} from 'rxjs/operators';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DocumentPageComponent {

  params = getParams(['semId', 'courseCode', 'documentId'], this.route);

  stat = this.params.pipe(
    switchMap(params => this.documentService.getStat(params.semId, params.courseCode, params.documentId)),
    shareReplay(1)
  );

  // meta = this.params.pipe(
  //   switchMap(params => this.documentService.getPrivateMeta({
  //     semId: params.semId,
  //     courseCode: params.courseCode,
  //     documentId: params.documentId as any
  //   })),
  //   shareReplay(1)
  // );
  //
  // editable = this.stat.pipe(
  //   switchMap(stat => {
  //     if ((stat.status != 'private' && stat.status != 'remarked') || stat.id == 'GRADES')
  //       return of(false);
  //     return this.meta.pipe(map(meta => meta.editable));
  //   })
  // );


  //
  // cellDataChange?: (event: EditEvent<any>) => any;
  //
  // columns: Observable<ColumnSetting<DocumentEntryUI>[]> = combineLatest([this.params, this.doc]).pipe(
  //   map(([params, [, , isPrivate]]) => {
  //     const cols = DOCUMENT_COLUMN_SETTINGS[params.documentId as DocumentId];
  //     if (!isPrivate) {
  //       for (const col of cols) if (col.editable) col.editable = undefined;
  //     } else if (cols.some(col => col.editable)) {
  //       const entriesSink = new Subject<Partial<DocumentEntry> | Partial<GradingCriteriaEntryUI>>();
  //
  //       this.documentService.connectPrivateDocumentEntriesSink({
  //         semId: params.semId,
  //         courseCode: params.courseCode,
  //         documentId: params.documentId as DocumentId
  //       }, entriesSink.asObservable());
  //
  //       this.cellDataChange = ({key, row}) => {
  //         const uniqueKey = params.documentId == 'GRADING_CRITERIA' ? 'grade' : 'rollNo';
  //         entriesSink.next({
  //           // [changedKey]: changedRow[changedKey as any],
  //           // [uniqueKey]: changedRow[uniqueKey]
  //         });
  //       };
  //     }
  //     return cols;
  //   }),
  // );

  constructor(
    protected documentService: DocumentService,
    protected route: ActivatedRoute,
  ) {
  }

}
