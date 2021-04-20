import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentService} from 'core/document.service';
import {DEPT_ABBR} from 'lib/constants/dept.constants';
import {mapMapEntries} from 'lib/utils/native/map.utils';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {getParams} from 'app/routes/routing.helper';
import {PublishService} from '../../../core/publish.service';
import {DOCUMENT_NAMES, MARK_DOCUMENT_IDS} from '../../../lib/constants/document.constants';
import {statsDocumentUIModel} from '../../../lib/data/combine/document-stat.combine';
import {MarklistDocumentId} from '../../../lib/models/document/document-base.model';
import {StatsDocumentUI} from '../../../lib/models/document/document-stat.model';
import {BatchPath} from '../../../lib/models/path.model';
import {getValue} from '../../../lib/utils/rxjs.utils';
import {MdcDialog} from '../../mdc-helper/mdc-dialog/mdc-dialog.service';

@Component({
  selector: 'app-batch-result-page',
  templateUrl: './batch-result-page.component.html',
  styleUrls: ['./batch-result-page.component.scss']
})
export class BatchResultPageComponent {

  DEPT_NAMES = Object.values(DEPT_ABBR);
  DOCUMENT_NAMES = DOCUMENT_NAMES;

  selectedDeptId = new BehaviorSubject(Object.keys(DEPT_ABBR)[0]);

  isPublishable = true; // TODO: calculate from submissions and publish btn

  params = getParams<BatchPath>(['semId', 'batchId'], this.route);

  submissionOverview = this.params.pipe(
    switchMap(params => this.documentService.getDeptwiseDocSubmissionOverview(params.semId, params.batchId)),
    // Append % to percentage values
    map(deptStats => mapMapEntries(deptStats, (key, val) => [key, val + '%']))
  );

  statDocs: Observable<StatsDocumentUI[]> = combineLatest([this.selectedDeptId, this.params]).pipe(
    switchMap(([deptId, params]) =>
      this.documentService.statsDocumentQuery({...params, deptId})
    ),
    map(statDocs => statDocs.map(statsDocumentUIModel)),
  );

  chooseSubject(c: number) {
    this.selectedDeptId.next(Object.keys(DEPT_ABBR)[c]);
  }

  openCourse(courseCode: string) {
    this.router.navigate(['../../course', courseCode], {relativeTo: this.route});
  }

  async publishBtn() {
    if (!this.isPublishable) return;
    const confirm = await this.dialog.alert({
      message: 'Are you sure ?',
      action: 'publish',
      cancel: 'cancel'
    });

    if (!confirm) return;

    this.isPublishable = false;
    const params = await getValue(this.params);
    const result = await this.publishService.publishResult(params);
    console.log(result);
  }

  markEntries(entries: StatsDocumentUI['entries']) {
    return Object.values(entries).filter(entry => MARK_DOCUMENT_IDS.includes(entry.documentId as MarklistDocumentId));
  }

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private publishService: PublishService,
    private dialog: MdcDialog,
    private router: Router,
  ) {
  }
}
