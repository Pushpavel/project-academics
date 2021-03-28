import {Component} from '@angular/core';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {GRADES_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {DocumentService} from '@service/document.service';
import {ActivatedRoute} from '@angular/router';
import {GradeEntry, GradesDocMeta} from '@lib/models/grading.model';

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss']
})
export class GradesPageComponent {

  courseCode = this.route.paramMap.pipe(
    map(params => params.get('course_code') ?? 'Error'),    // Todo: Handle if course_code is null
    shareReplay(1),
  );

  documentStat = this.courseCode.pipe(
    switchMap(courseCode => this.documentService.getStats({courseCode, documentId: 'GRADES'})),
    map(stats => stats[0]),
    shareReplay(1),
  );

  documentData = this.documentStat.pipe(
    // Todo: query with UserService about the access level and compare them with doc.status
    switchMap(doc =>
      this.documentService.getMeta<GradesDocMeta>(doc.courseCode, doc.id, false).pipe(
        map(meta => ({stat: doc, meta}))
      )
    ),
  );

  gradeEntries = this.documentStat.pipe(
    switchMap(doc =>
      this.documentService.getEntries<GradeEntry>(doc.courseCode, 'GRADES', false)
    ),
  );

  columns = GRADES_COLUMN_SETTINGS;

  constructor(private documentService: DocumentService, private route: ActivatedRoute) {
  }


}
