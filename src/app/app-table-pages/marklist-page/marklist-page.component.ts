import {Component} from '@angular/core';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {MARKLIST_COLUMN_SETTINGS} from '@lib/constants/column-settings.constants';
import {DocumentService} from '@service/document.service';
import {ActivatedRoute} from '@angular/router';
import {MarklistDocMeta, MarklistEntry} from '@lib/models/marklist.model';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'app-marklist-page',
  templateUrl: './marklist-page.component.html',
  styleUrls: ['./marklist-page.component.scss']
})
export class MarklistPageComponent {
  params = getParams(['semId', 'courseCode', 'documentId'], this.route);

  documentStat = this.params.pipe(
    switchMap((params) => this.documentService.getStat(params.semId, params.courseCode, params.courseCode)),
    shareReplay(1),
  );

  documentData = this.documentStat.pipe(
    // Todo: query with UserService about the access level and compare them with doc.status
    switchMap(doc =>
      this.documentService.getMeta<MarklistDocMeta>(doc.semId, doc.courseCode, doc.id, false).pipe(
        map(meta => ({stat: doc, meta}))
      )
    ),
  );

  marklistEntries = this.documentStat.pipe(
    // Todo: query with UserService about the access level and compare them with doc.status
    switchMap(doc =>
      this.documentService.getEntries<MarklistEntry>(doc.semId, doc.courseCode, doc.id, false)
    ),
  );

  columns = MARKLIST_COLUMN_SETTINGS;

  constructor(private documentService: DocumentService, private route: ActivatedRoute) {
  }

}
