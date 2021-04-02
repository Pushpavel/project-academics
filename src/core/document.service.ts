import {Injectable} from '@angular/core';
import {MarklistEntryRaw, MarklistEntryUI} from '@lib/models/marklist.model';
import {AttendanceEntryRaw, AttendanceEntryUI} from '@lib/models/attendance.model';
import {Observable, of} from 'rxjs';
import {GradingCriteriaEntryUI, GradeEntryUI} from '@lib/models/grading.model';
import {randFromRange} from '@lib/utils/number.util';
import {DocumentEntry, DocumentMetaRaw, DocumentStat} from '@lib/models/document.model';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {courseDocumentStat, courseDocumentStats} from '@lib/data-adapters/document-stat.adapter';
import {filter, map} from 'rxjs/operators';
import {
  privateAttendanceEntries,
  privateDocumentMeta, privateMarklistEntries
} from '@lib/data-adapters/document.adapter';
import {DocumentPath} from '@lib/models/path.model';
import {MARK_DOCUMENT_IDS} from '@lib/constants/document.constants';
import {
  privateAttendanceDocumentEntriesSink,
  privateDocumentMetaSink,
  privateGradingCriteriaEntriesSink,
  privateMarkDocumentEntriesSink
} from '@lib/data-adapters/document-sink.adapter';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  getCourseDocStats = courseDocumentStats;
  getCourseDocStat = courseDocumentStat;
  connectPrivateDocumentMetaSink = privateDocumentMetaSink;

  getPrivateMeta = privateDocumentMeta;
  getPrivateMarklistEntries = privateMarklistEntries;
  getPrivateAttendanceEntries = privateAttendanceEntries;

  getStat(semId: string, courseCode: string, documentId: string): Observable<DocumentStat> {
    return this.getCourseDocStat(semId, courseCode).pipe(
      // tslint:disable-next-line:no-non-null-assertion TODO: HANDLE THIS
      map(stats => stats.stats.get(documentId)!)
    );
  }

  getDeptwiseDocSubmissionOverview(semId: string, batchId: string) {
    // TODO: Implement this
    const entries = Object.keys(DEPT_ABBR).map(id => [DEPT_ABBR[id as keyof typeof DEPT_ABBR], randFromRange(0, 100)] as const);
    return of(new Map(entries));
  }

  getPublicMeta(path: DocumentPath): Observable<DocumentMetaRaw> {
    throw new Error('Not Implemented');// TODO: Implement this
  }


  connectPrivateDocumentEntriesSink(p: DocumentPath, sink: Observable<Partial<DocumentEntry> | Partial<GradingCriteriaEntryUI>>) {
    if (p.documentId in MARK_DOCUMENT_IDS) {
      privateMarkDocumentEntriesSink(p, (sink as Observable<Partial<MarklistEntryRaw>>)
        .pipe(filter(updates => !!updates.rollNo)) as any);
    } else if (p.documentId == 'GRADING_CRITERIA')
      privateGradingCriteriaEntriesSink(p, sink as any);
    else if (p.documentId == 'ATTENDANCE')
      privateAttendanceDocumentEntriesSink(p, (sink as Observable<Partial<AttendanceEntryRaw>>)
        .pipe(filter(updates => !!updates.rollNo),) as any);

  }
}

export type DocumentEntryUI = MarklistEntryUI | AttendanceEntryUI | GradeEntryUI | GradingCriteriaEntryUI

