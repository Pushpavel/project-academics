import {Injectable} from '@angular/core';
import {MarklistEntryUI} from '@lib/models/marklist.model';
import {AttendanceEntryUI} from '@lib/models/attendance.model';
import {combineLatest, Observable, of} from 'rxjs';
import {GradingCriteriaEntryUI, GradeEntryUI} from '@lib/models/grading.model';
import {randFromRange} from '@lib/utils/number.util';
import {DocumentMetaRaw, DocumentStat, MarklistDocumentId} from '@lib/models/document.model';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {courseDocumentStat, courseDocumentStats} from '@lib/data-adapters/document-stat.adapter';
import {map} from 'rxjs/operators';
import {
  privateAttendanceEntries,
  privateDocumentMeta, privateMarklistEntries
} from '@lib/data-adapters/document.adapter';
import {CoursePath, DocumentPath} from '@lib/models/path.model';
import {
  privateDocumentEntriesSink, privateDocumentMetaSink
} from '@lib/data-adapters/document-sink.adapter';
import {studentNames} from '@lib/data-adapters/students.adapter';
import {attendanceEntriesUIModel} from '@lib/data-adapters/combine/attendance.combine';
import {marklistEntriesUIModel} from '@lib/data-adapters/combine/marklist.combine';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  getCourseDocStats = courseDocumentStats;
  getCourseDocStat = courseDocumentStat;

  getPrivateMeta = privateDocumentMeta;

  sinkPrivateDocumentEntry = privateDocumentEntriesSink;
  sinkPrivateDocumentMeta = privateDocumentMetaSink;

  getPrivateAttendanceEntries(p: CoursePath) {
    return combineLatest([
      privateAttendanceEntries(p),
      studentNames(p),
      this.getPrivateMeta({...p, documentId: 'ATTENDANCE'})
    ]).pipe(
      map(([entries, names, meta]) => attendanceEntriesUIModel(entries, names, meta))
    );
  }

  getPrivateMarklistEntries(p: DocumentPath<MarklistDocumentId>) {
    return combineLatest([privateMarklistEntries(p), studentNames(p)]).pipe(
      map(([entries, names]) => marklistEntriesUIModel(entries, names))
    );
  }

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

}

export type DocumentEntryUI = MarklistEntryUI | AttendanceEntryUI | GradeEntryUI | GradingCriteriaEntryUI

