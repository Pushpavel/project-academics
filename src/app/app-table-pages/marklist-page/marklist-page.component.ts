import {Component} from '@angular/core';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {MARKLIST_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {DocumentService} from '@service/document.service';
import {ActivatedRoute} from '@angular/router';
import {MarklistDocMeta, MarklistEntry} from '@lib/models/marklist.model';

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
    switchMap(([courseCode, documentId]) => this.documentService.getStats({courseCode, documentId})),
    map(stats => stats[0]),
    shareReplay(1),
  );

  documentData = this.documentStat.pipe(
    // Todo: query with UserService about the access level and compare them with doc.status
    switchMap(doc =>
      this.documentService.getMeta<MarklistDocMeta>(doc.courseCode, doc.id, false).pipe(
        map(meta => ({stat: doc, meta}))
      )
    ),
  );

  marklistEntries = this.documentStat.pipe(
    // Todo: query with UserService about the access level and compare them with doc.status
    switchMap(doc =>
      this.documentService.getEntries<MarklistEntry>(doc.courseCode, doc.id, false)
    ),
  );

  columns = MARKLIST_COLUMN_SETTINGS;

  constructor(private documentService: DocumentService, private route: ActivatedRoute) {
  }

}
