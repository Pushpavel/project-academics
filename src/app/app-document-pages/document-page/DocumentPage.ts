import {Directive} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService} from '@service/document.service';
import {getParams} from '../../routes/routing.helper';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';
import {combineLatest, Observable, of} from 'rxjs';
import {UserCourseRelation} from '@lib/models/course.model';
import {DocumentPath} from '@lib/models/path.model';
import {PrivateDocumentId} from '@lib/models/document.model';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DocumentPage {

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
    }),
    tap(v => console.log(v)),
  );

  editable = this.meta.pipe(map(meta => meta.editable));

  constructor(
    protected documentService: DocumentService,
    protected route: ActivatedRoute,
  ) {
  }

}
