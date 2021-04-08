import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {map} from 'rxjs/operators';
import {Sink} from '@lib/data-adapters/base/sink.interfaces';
import {combineLatest, Subscription} from 'rxjs';
import {GradingCriteriaEntryUI, GradingCriteriaMeta} from '@lib/models/document/grading-criteria.model';

@Component({
  selector: 'app-grading-criteria-page',
  templateUrl: './grading-criteria-page.component.html',
  styleUrls: ['./grading-criteria-page.component.scss']
})
export class GradingCriteriaPageComponent extends DocumentPage implements OnInit, OnDestroy {

  entries = this.meta.pipe(
    map((meta) => (meta as GradingCriteriaMeta).entries)
  );

  entrySink = new Sink<GradingCriteriaEntryUI, 'grade' | 'minMark'>();

  subs = new Subscription();

  onEdit(key: string, row: GradingCriteriaEntryUI, event: Event) {
    if (key != 'minMark') return;
    this.entrySink.next({
      grade: row.grade,
      minMark: (event.target as HTMLInputElement).valueAsNumber
    });
  }

  ngOnInit(): void {
    //  Setup Sinks
    const sub = combineLatest([this.editable, this.params])
      .subscribe(([editable, p]) => {
        if (editable)
          this.documentService.sinkPrivateGradingCriteriaEntry(p, this.entrySink);
      });

    this.subs.add(sub);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
