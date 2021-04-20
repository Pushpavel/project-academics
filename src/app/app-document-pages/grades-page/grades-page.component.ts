import {Component} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {combineLatest, Observable, of} from 'rxjs';
import {GradeEntryUI, ProtectedGradesMetaRaw} from '@models/document/grading.model';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {DocumentId} from '@models/document/document-base.model';
import {gradesUIModel} from 'lib/data/combine/grades.combine';
import {getValue, sortByKey} from 'lib/utils/rxjs.utils';

@Component({
  selector: 'app-grades-page',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.scss'],
  host: {class: 'document-page'}
})
export class GradesPageComponent extends DocumentPage<'GRADES', never, ProtectedGradesMetaRaw> {

  entries: Observable<GradeEntryUI[]> = combineLatest([this.stats, this.params]).pipe(
    switchMap(([stats, p]) => {
      const documentIds = Object.keys(stats.entries) as DocumentId[];
      const availableDocIds = documentIds.filter(id => stats.entries[id].status != 'private' && id != 'ATTENDANCE');
      const metas = (availableDocIds.length == 0) ?
        of([]) : this.documentService.getProtectedMetas(p, availableDocIds);

      const studentNames = this.documentService.getStudentNames(p).pipe(
        map(names => {
          if (!names)
            throw new Error('StudentNames does not exists'); // TODO: handle gracefully
          return names;
        })
      );

      return combineLatest([
        metas,
        studentNames,
      ]).pipe(
        map(gradesUIModel),
        sortByKey('rollNo')
      );
    }),
    shareReplay(),
  );


  disableEdit = true;
  isDataFromPrivate = of(undefined);
  editable = of(false);

  async downloadBtn() {
    const p = await getValue(this.params);
    const entries = await getValue(this.entries);

    this.csvService.downloadDocumentCSV(p, entries);
  }

  async publishBtn(): Promise<void> {
    throw new Error('Not Implemented');
  }

}
