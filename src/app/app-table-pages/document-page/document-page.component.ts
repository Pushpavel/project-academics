import {Directive} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService} from '@service/document.service';
import {getParams} from '../../routes/routing.helper';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {UserCourseRelation} from '@lib/models/course.model';
import {DocumentPath} from '@lib/models/path.model';
import {DocumentId, PrivateDocumentId} from '@lib/models/document.model';
import {DOCUMENT_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DocumentPageComponent {

  params = getParams(['semId', 'courseCode', 'documentId'], this.route);

  stat = this.params.pipe(
    switchMap(params => this.documentService.getStat(params.semId, params.courseCode, params.documentId)),
    shareReplay(1)
  );

  //  TODO: Implement this
  userCR: Observable<UserCourseRelation> = of({
    isFaculty: true
  });

  isPrivate = combineLatest([this.userCR, this.stat]).pipe(
    map(([cr, stat]) => cr.isFaculty && (stat.status == 'private' || stat.status == 'remarked') && stat.id != 'GRADES')
  );

  meta = combineLatest([this.params, this.isPrivate]).pipe(
    switchMap(([params, isPrivate]) => {
      const p: DocumentPath = {
        semId: params.semId,
        courseCode: params.courseCode,
        documentId: params.documentId as any
      };

      if (isPrivate)
        return this.documentService.getPrivateMeta(p as DocumentPath<PrivateDocumentId>);
      return this.documentService.getPublicMeta(p);
    })
  );

  editable = this.meta.pipe(map(meta => meta.editable));

  columns = combineLatest([this.params, this.editable]).pipe(
    map(([params, editable]) =>
      DOCUMENT_COLUMN_SETTINGS[params.documentId as DocumentId](editable)
    )
  );


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
