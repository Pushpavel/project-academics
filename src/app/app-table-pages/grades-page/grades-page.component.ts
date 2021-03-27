import {Component} from '@angular/core';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {GRADES_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {DocumentService} from '@service/document.service';
import {ActivatedRoute} from '@angular/router';
import {GradeEntry} from '@lib/models/grading.model';

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
    // Todo: query with UserService about the access level or type of user
    switchMap(courseCode => this.documentService.getStat(courseCode, 'GRADES', false)),
    shareReplay(1),
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
