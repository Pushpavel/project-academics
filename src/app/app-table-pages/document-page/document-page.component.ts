import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService, DocumentEntryUI} from '@service/document.service';
import {getParams} from '../../routes/routing.helper';
import {filter, map, shareReplay, switchMap} from 'rxjs/operators';
import {DocStatus, DocumentId} from '@lib/models/document.model';
import {combineLatest, Observable} from 'rxjs';
import {DOCUMENT_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {ColumnSetting} from '../../mdc-helper/mdc-table/mdc-table.component';
import {UserService} from '@service/user.service';
import {CourseService} from '@service/course.service';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent {

  params = getParams(['semId', 'courseCode', 'documentId'], this.route);

  columns: Observable<ColumnSetting<DocumentEntryUI>[]> = this.params.pipe(
    map(params => DOCUMENT_COLUMN_SETTINGS[params.documentId as DocumentId])
  );

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
      const isPrivate = user?.uid == course.facultyId && (stat.status == DocStatus.PRIVATE || stat.status == DocStatus.REMARKED);
      return this.documentService.getDocument({
        semId: stat.semId,
        courseCode: stat.courseCode,
        documentId: stat.id
      }, isPrivate);
    }),
    shareReplay(1)
  );

  meta = this.doc.pipe(map(doc => doc[0]));
  entries = this.doc.pipe(map(doc => doc[1]));


  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private user: UserService,
    private courseService: CourseService,
  ) {
  }

}
