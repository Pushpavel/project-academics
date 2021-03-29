import {Component} from '@angular/core';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {GRADES_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {DocumentService} from '@service/document.service';
import {ActivatedRoute} from '@angular/router';
import {GradeEntry, GradesDocMeta} from '@lib/models/grading.model';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss']
})
export class GradesPageComponent {

  params = getParams(['semId', 'courseCode'], this.route);

  documentStat = this.params.pipe(
    switchMap(params => this.documentService.getStat(params.semId, params.courseCode, 'GRADES')),
    shareReplay(1),
  );

  documentData = this.documentStat.pipe(
    // Todo: query with UserService about the access level and compare them with doc.status
    switchMap(doc =>
      this.documentService.getMeta<GradesDocMeta>(doc.semId, doc.courseCode, doc.id, false).pipe(
        map(meta => ({stat: doc, meta}))
      )
    ),
  );

  gradeEntries = this.documentStat.pipe(
    switchMap(doc =>
      this.documentService.getEntries<GradeEntry>(doc.semId, doc.courseCode, 'GRADES', false)
    ),
  );

  columns = GRADES_COLUMN_SETTINGS;

  constructor(private documentService: DocumentService, private route: ActivatedRoute) {
  }


}
