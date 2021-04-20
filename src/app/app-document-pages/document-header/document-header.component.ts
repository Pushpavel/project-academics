import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserCourseRelation} from '../../../lib/models/course.model';
import {DocumentId} from '../../../lib/models/document/document-base.model';
import {StatsEntryUI} from '../../../lib/models/document/document-stat.model';

@Component({
  selector: 'document-header',
  template: `
    <h4>{{title}}</h4>
    <ng-container *ngIf="cr && stat">
      <div class="text-block" *ngIf="stat.publicTimestamp?.toDate() as date">
        <span class="dark-text-secondary overline">PUBLISHED ON</span>
        <span class="dark-text-primary sub2">{{date|date:'mediumDate'}}</span>
      </div>
      <div class="text-block" *ngIf="stat.submittedTimestamp?.toDate() as date">
        <span class="dark-text-secondary overline">SUBMITTED ON</span>
        <span class="dark-text-primary sub2">{{date|date:'mediumDate'}}</span>
      </div>

      <button mdc-button="outlined" class="surface"
              *ngIf="(cr.isFaculty || cr.isHod || cr.isExamCell) && stat.documentId != 'GRADING_CRITERIA'"
              (click)="download.emit()">
        <mdc-icon>download</mdc-icon>
        DOWNLOAD
      </button>

      <button mdc-button="raised" *ngIf="cr.isFaculty && showAction" (click)="action.emit()">{{actionLabel}}</button>
    </ng-container>
  `,
  styleUrls: ['./document-header.component.scss'],
})
export class DocumentHeaderComponent<ID extends DocumentId> {

  @Input() title?: string | null;
  @Input() stat?: StatsEntryUI<ID> | null;
  @Input() cr?: UserCourseRelation | null;
  @Input() actionLabel = 'PUBLISH';
  @Input() showAction?: boolean | null;

  @Output() download = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();

}
