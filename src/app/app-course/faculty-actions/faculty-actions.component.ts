import {Component} from '@angular/core';
import {DOCUMENT_NAMES} from 'lib/constants/document.constants';
import {map, switchMap} from 'rxjs/operators';
import {DocumentService} from 'core/document.service';
import {statsDocumentUIModel} from '../../../lib/data/combine/document-stat.combine';
import {DocumentId} from '../../../lib/models/document/document-base.model';
import {notNull} from '../../../lib/utils/rxjs.utils';
import {getParams} from '../../routes/routing.helper';
import {ActivatedRoute, Router} from '@angular/router';
import {StatsDocumentUI} from '@models/document/document-stat.model';
import {UserCourseRelation} from '@models/course.model';

@Component({
  selector: 'faculty-actions',
  templateUrl: './faculty-actions.component.html',
  styleUrls: ['./faculty-actions.component.scss']
})
export class FacultyActionsComponent {

  DOCUMENT_NAMES = DOCUMENT_NAMES;

  params = getParams(['semId', 'courseCode'], this.route);

  statsDocument = this.params.pipe(
    switchMap(params => this.documentService.getStatsDocument(params)),
    notNull,
    map(statsDocumentUIModel)
  );

  userCR = this.route.data.pipe(map(data => data.userCrResolve as UserCourseRelation));


  openDocument(docId: string) {
    this.router.navigate([docId], {relativeTo: this.route});
  }

  asStatsUIEntry(entry: any) {
    return entry as StatsDocumentUI['entries'][DocumentId];
  }

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

}
