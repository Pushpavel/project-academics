import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService, DocumentEntryUI} from '@service/document.service';
import {getParams} from '../../routes/routing.helper';
import {filter, map, shareReplay, switchMap} from 'rxjs/operators';
import {DocStatus, DocumentEntry, DocumentId} from '@lib/models/document.model';
import {combineLatest, Observable, Subject} from 'rxjs';
import {DOCUMENT_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {EditEvent, ColumnSetting} from '../../mdc-helper/mdc-table/mdc-table.component';
import {UserService} from '@service/user.service';
import {CourseService} from '@service/course.service';
import {GradingCriteriaEntry} from '@lib/models/grading.model';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent {

  params = getParams(['semId', 'courseCode', 'documentId'], this.route);

  stat = this.params.pipe(
    switchMap(params => this.documentService.getStat(params.semId, params.courseCode, params.documentId)),
    shareReplay(1)
  );

  course = this.params.pipe(
    switchMap(params => this.courseService.getCourse(params.semId, params.courseCode)),
    shareReplay(1)
  );

  doc = combineLatest([this.stat, this.user.user, this.course]).pipe(
    filter(data => data[1] != null),
    switchMap(([stat, user, course]) => {
      // TODO: Handle Unauthorized access
      const isPrivate = (stat.status == DocStatus.PRIVATE || stat.status == DocStatus.REMARKED);
      return this.documentService.getDocument({
        semId: stat.semId,
        courseCode: stat.courseCode,
        documentId: stat.id
      }, isPrivate).pipe(map(doc => [...doc, isPrivate] as const));
    }),
    shareReplay(1),
  );

  meta = this.doc.pipe(map(doc => doc[0]));
  entries = this.doc.pipe(map(doc => doc[1]));


  cellDataChange?: (event: EditEvent<any>) => any;

  columns: Observable<ColumnSetting<DocumentEntryUI>[]> = combineLatest([this.params, this.doc]).pipe(
    map(([params, [, , isPrivate]]) => {
      const cols = DOCUMENT_COLUMN_SETTINGS[params.documentId as DocumentId];
      if (!isPrivate) {
        for (const col of cols) if (col.editable) col.editable = undefined;
      } else if (cols.some(col => col.editable)) {
        const entriesSink = new Subject<Partial<DocumentEntry> | Partial<GradingCriteriaEntry>>();

        this.documentService.connectPrivateDocumentEntriesSink({
          semId: params.semId,
          courseCode: params.courseCode,
          documentId: params.documentId as DocumentId
        }, entriesSink.asObservable());

        this.cellDataChange = ({key, row}) => {
          const uniqueKey = params.documentId == 'GRADING_CRITERIA' ? 'grade' : 'rollNo';
          entriesSink.next({
            // [changedKey]: changedRow[changedKey as any],
            // [uniqueKey]: changedRow[uniqueKey]
          });
        };
      }
      return cols;
    }),
  );

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private user: UserService,
    private courseService: CourseService,
  ) {
  }

}
