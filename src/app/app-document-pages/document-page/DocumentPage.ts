import {Directive} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService} from 'core/document.service';
import {getParams} from '../../routes/routing.helper';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {UserCourseRelation} from '@models/course.model';
import {DocumentPath} from '@models/path.model';
import {
  DocumentId,
  isPrivateMeta,
  NonGradeDocumentId,
  PrivateDocumentId,
  PrivateMetaRaw,
  ProtectedMetaRaw
} from '@models/document/document-base.model';
import {getValue} from 'lib/utils/rxjs.utils';
import {PublishService} from 'core/publish.service';
import {MdcDialog} from '../../mdc-helper/mdc-dialog/mdc-dialog.service';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DocumentPage<ID extends DocumentId,
  PM extends PrivateMetaRaw,
  RM extends ProtectedMetaRaw> {

  disableEdit = false;

  params = getParams<DocumentPath<ID>>(['semId', 'courseCode', 'documentId'], this.route);

  stat = this.params.pipe(
    switchMap(p => this.documentService.getStat(p)),
    shareReplay(1)
  );

  userCR: Observable<UserCourseRelation> = this.route.data.pipe(
    map(data => data.userCrResolve?.userCR)
  );

  isDataFromPrivate = combineLatest([this.userCR, this.stat]).pipe(
    map(([cr, stat]) => cr.isFaculty && (stat.status == 'private' || stat.status == 'remarked') && stat.id != 'GRADES')
  );

  meta = combineLatest([this.params, this.isDataFromPrivate]).pipe(
    switchMap(([p, isPrivate]) => {
      if (isPrivate)
        return this.documentService.getPrivateMeta<PM>(p, p.documentId as PrivateDocumentId & ID);
      return this.documentService.getProtectedMetas<RM>(p, [p.documentId]).pipe(map(metas => metas[0]));
    }),
    map(meta => {
      if (!meta)
        throw new Error('Meta is null'); // TODO: handle this
      return meta;
    })
  );

  editable = this.meta.pipe(map(meta => meta && isPrivateMeta<PM>(meta) && meta.editable));

  async publishBtn() {
    this.disableEdit = true;
    const [params] = await getValue(this.params);
    const confirm = await this.dialog.alert({message: `Confirm ?`, action: 'Publish', cancel: 'Cancel'});

    if (!confirm) {
      this.disableEdit = false;
      return;
    }
    const result = await this.publishService.submitDocument(params, params.documentId as NonGradeDocumentId & ID);
    console.log(result);
  }

  constructor(
    protected publishService: PublishService,
    protected documentService: DocumentService,
    protected route: ActivatedRoute,
    protected dialog: MdcDialog,
  ) {
  }

}
