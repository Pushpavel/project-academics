import {Component} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {combineLatest, Observable, of} from 'rxjs';
import {GradeEntryUI} from '@lib/models/document/grading.model';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {DocumentId} from '@lib/models/document/document-base.model';
import {gradesUIModel} from '@lib/data-adapters/combine/grades.combine';

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss'],
  host: {class: 'document-page'}
})
export class GradesPageComponent extends DocumentPage {

  stats = this.params.pipe(
    switchMap(p => this.documentService.getCourseDocStat(p)),
    shareReplay(1)
  );

  stat = this.stats.pipe(map(stats => stats.stats.GRADES));

  entries: Observable<GradeEntryUI[]> = combineLatest([this.stats, this.params]).pipe(
    switchMap(([stats, p]) => {
      const documentIds = Object.keys(stats.stats) as DocumentId[];
      const nonPrivateDocIds = documentIds.filter(id => stats.stats[id].status != 'private');
      return this.documentService.getProtectedMetas(p, nonPrivateDocIds).pipe(
        map(gradesUIModel)
      );
    })
  );


  disableEdit = true;
  meta = of(null);
  isPrivate = of(undefined);
  editable = of(false);

  async publishBtn(): Promise<void> {
    throw new Error('Not Implemented');
  }

}
