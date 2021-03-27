import {Component} from '@angular/core';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {MARKLIST_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {DocumentService} from '@service/document.service';
import {ActivatedRoute} from '@angular/router';
import {MarklistEntry} from '@lib/models/marklist.model';

@Component({
  selector: 'app-marklist-page',
  templateUrl: './marklist-page.component.html',
  styleUrls: ['./marklist-page.component.scss']
})
export class MarklistPageComponent {
  params = this.route.paramMap.pipe(
    // Todo: Handle if course_code or document_id is null or invalid
    map(params => [params.get('course_code') ?? 'Error', params.get('document_id') ?? 'Error'] as const),
    shareReplay(1),
  );

  documentStat = this.params.pipe(
    // Todo: query with UserService about the access level or type of user
    switchMap(([courseCode, docId]) => this.documentService.getStat(courseCode, docId, false)),
    shareReplay(1),
  );

  marklistEntries = this.documentStat.pipe(
    switchMap(doc =>
      this.documentService.getEntries<MarklistEntry>(doc.courseCode, doc.id, false)
    ),
  );

  columns = MARKLIST_COLUMN_SETTINGS;

  constructor(private documentService: DocumentService, private route: ActivatedRoute) {
  }

}
