import {Component} from '@angular/core';
import {gradingCriteriaUIEntriesFromMeta} from '../../../lib/data/combine/grading-criteria.combine';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {Sink} from 'lib/data/base/sink.interfaces';
import {combineLatest, Observable, of} from 'rxjs';
import {GradingCriteriaEntryUI, GradingCriteriaMetaRaw} from '@models/document/grading-criteria.model';

@Component({
  selector: 'app-grading-criteria-page',
  templateUrl: './grading-criteria-page.component.html',
  styleUrls: ['./grading-criteria-page.component.scss'],
  host: {class: 'document-page'}
})
export class GradingCriteriaPageComponent extends DocumentPage {

  entries = (this.meta as Observable<GradingCriteriaMetaRaw>).pipe(map(gradingCriteriaUIEntriesFromMeta));

  entrySink = new Sink<GradingCriteriaEntryUI, 'grade' | 'minMark'>();

  setupSink = combineLatest([this.editable, this.params]).pipe(
    switchMap(([editable, p]) => {
      if (editable)
        return this.documentService.sinkPrivateGradingCriteriaEntry(p, this.entrySink);
      return of(null);
    })
  ).subscribe();

  onEdit(key: string, row: GradingCriteriaEntryUI, event: Event) {
    if (key != 'minMark') return;
    this.entrySink.next({
      grade: row.grade,
      minMark: (event.target as HTMLInputElement).valueAsNumber
    });
  }
}
