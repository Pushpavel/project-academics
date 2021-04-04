import {Component, OnDestroy, OnInit} from '@angular/core';
import {DocumentPage} from '../document-page/DocumentPage';
import {map} from 'rxjs/operators';
import {ListSink} from '@lib/data-adapters/base/sink.interfaces';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {GradingCriteriaEntryUI, GradingCriteriaMeta} from '@lib/models/grading.model';

@Component({
  selector: 'app-grading-criteria-page',
  templateUrl: './grading-criteria-page.component.html',
  styleUrls: ['./grading-criteria-page.component.scss']
})
export class GradingCriteriaPageComponent extends DocumentPage implements OnInit, OnDestroy {

  entries = this.meta.pipe(
    map((meta) => (meta as GradingCriteriaMeta).entries)
  );

  entrySink: ListSink<GradingCriteriaEntryUI, 'grade'> = new Subject();

  subs = new Subscription();

  onEdit(key: string, row: GradingCriteriaEntryUI, event: Event) {
    this.entrySink.next({
      grade: row.grade,
      [key]: (event.target as HTMLInputElement).valueAsNumber
    });
  }

  ngOnInit(): void {
    //  Setup Sinks
    const sub = combineLatest([this.editable, this.params])
      .subscribe(([editable, params]) => {
        if (editable)
          this.documentService.sinkPrivateGradingCriteriaEntry({
            semId: params.semId,
            courseCode: params.courseCode
          }, this.entrySink);
      });

    this.subs.add(sub);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
