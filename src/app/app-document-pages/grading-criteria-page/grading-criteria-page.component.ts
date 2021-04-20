import {Component, OnInit} from '@angular/core';
import {gradingCriteriaUIEntriesFromMeta} from '../../../lib/data/combine/grading-criteria.combine';
import {notNull} from '../../../lib/utils/rxjs.utils';
import {EditEvent} from '../../mdc-helper/mdc-table/mdc-table/mdc-table.component';
import {DocumentPage} from '../document-page/DocumentPage';
import {map, switchMap} from 'rxjs/operators';
import {Sink} from 'lib/data/base/sink.interfaces';
import {BehaviorSubject, combineLatest, of} from 'rxjs';
import {
  GradingCriteriaEntryUI, GradingCriteriaMetaRaw,
  PrivateGradingCriteriaMetaRaw,
  ProtectedGradingCriteriaMetaRaw
} from '@models/document/grading-criteria.model';

@Component({
  selector: 'app-grading-criteria-page',
  templateUrl: './grading-criteria-page.component.html',
  styleUrls: ['./grading-criteria-page.component.scss'],
  host: {class: 'document-page'}
})
export class GradingCriteriaPageComponent extends DocumentPage<'GRADING_CRITERIA',
  PrivateGradingCriteriaMetaRaw,
  ProtectedGradingCriteriaMetaRaw> implements OnInit {

  _meta = new BehaviorSubject<GradingCriteriaMetaRaw | null>(null);

  _entriesUI = this._meta.pipe(notNull, map(gradingCriteriaUIEntriesFromMeta));

  entrySink = new Sink<GradingCriteriaEntryUI, 'grade' | 'minMark'>();

  setupSink = combineLatest([this.editable, this.params]).pipe(
    switchMap(([editable, p]) => {
      if (editable)
        return this.documentService.sinkPrivateGradingCriteriaEntry(p, this.entrySink);
      return of(null);
    })
  ).subscribe();

  ngOnInit() {
    this.meta.subscribe(this._meta);
  }

  onEdit({row, target}: EditEvent<GradingCriteriaEntryUI>) {
    if (!this._meta.value) return;

    const meta = {...this._meta.value, entries: {...this._meta.value?.entries}};
    meta.entries[row.grade] = target.valueAsNumber;
    this._meta.next(meta);
    this.entrySink.next({
      grade: row.grade,
      minMark: target.valueAsNumber
    });
  }
}
