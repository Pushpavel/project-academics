import {Directive} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DocumentService} from '@service/document.service';
import {getParams} from '../../routes/routing.helper';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {UserCourseRelation} from '@models/course.model';
import {DocumentPath} from '@models/path.model';
import {NonGradeDocumentId, PrivateDocumentId} from '@models/document/document-base.model';
import {getValue} from '@utils/rxjs.utils';
import {PublishService} from '@service/publish.service';
import {MdcDialog} from '../../mdc-helper/mdc-dialog/mdc-dialog.service';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DocumentPage {

  disableEdit = false;

  params = getParams<DocumentPath>(['semId', 'courseCode', 'documentId'], this.route);

  stat = this.params.pipe(
    switchMap(p => this.documentService.getStat(p)),
    shareReplay(1)
  );

  userCR: Observable<UserCourseRelation> = this.route.data.pipe(
    map(data => data.userCrResolve?.userCR)
  );

  isPrivate = combineLatest([this.userCR, this.stat]).pipe(
    map(([cr, stat]) => cr.isFaculty && (stat.status == 'private' || stat.status == 'remarked') && stat.id != 'GRADES')
  );

  meta = combineLatest([this.params, this.isPrivate]).pipe(
    switchMap(([p, isPrivate]) => {

      if (isPrivate)
        return this.documentService.getPrivateMeta(p, p.documentId as PrivateDocumentId);
      return this.documentService.getPublicMeta(p);
    }),
  );

  editable = this.meta.pipe(map(meta => meta.editable));

  async publishBtn() {
    this.disableEdit = true;
    const [params] = await getValue(this.params);
    const confirm = await this.dialog.alert({message: `Confirm ?`, action: 'Publish', cancel: 'Cancel'});

    if (!confirm) {
      this.disableEdit = false;
      return;
    }
    const result = await this.publishService.submitDocument(params, params.documentId as NonGradeDocumentId);
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
