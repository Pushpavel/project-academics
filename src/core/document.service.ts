import {Injectable} from '@angular/core';
import {MarklistEntry} from '@lib/models/marklist.model';
import {AttendanceEntry} from '@lib/models/attendance.model';
import {Observable, of} from 'rxjs';
import {GradeCriteriaEntry, GradeEntry} from '@lib/models/grading.model';
import {randFromRange} from '@lib/utils/number.util';
import {DocumentId, DocumentStat} from '@lib/models/document.model';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {courseDocumentStat, courseDocumentStats} from '@lib/data-adapters/document-stat.adapter';
import {map} from 'rxjs/operators';
import {privateDocumentMeta} from '@lib/data-adapters/document.adapter';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  getCourseDocStats = courseDocumentStats;
  getCourseDocStat = courseDocumentStat;

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

  getMeta(semId: string, courseCode: string, documentId: DocumentId, isPrivate = false) {
    // TODO: Implement this
    return privateDocumentMeta(semId, courseCode, documentId);
  }

  getEntries<T extends DocumentEntry>(semId: string, courseCode: string, documentId: string, isPrivate = false): Observable<T[]> {
    // TODO: Implement this
    return of(new Array(40).fill(1).map((_, index) => (
        {
          rollNo: 'CS19B10' + index,
          name: 'Student ' + index,
          noOfAttendedClasses: randFromRange(0, 200),
          percentage: randFromRange(0, 100)
        }) as AttendanceEntry
      ) as T[]
    );
  }
}

export type DocumentEntry = MarklistEntry | AttendanceEntry | GradeEntry | GradeCriteriaEntry
