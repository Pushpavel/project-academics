import {Injectable} from '@angular/core';
import {MarklistDocMeta, MarklistEntry} from '@lib/models/marklist.model';
import {AttendanceDocMeta, AttendanceEntry} from '@lib/models/attendance.model';
import {Observable, of} from 'rxjs';
import {GradeEntry, GradesDocMeta} from '@lib/models/grading.model';
import {randFromRange} from '@lib/utils/number.util';
import DOCUMENT_NAMES from '@lib/constants/document.constants';
import {DocStatus, DocumentStat} from '@lib/models/document.model';
import {DEPT_ABBR} from '@lib/constants/dept.constants';
import {CourseDocumentStats} from '@lib/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  getCourseDocStats(query: { semId: string, courseCode?: string, batchId?: string, deptId?: string }): Observable<CourseDocumentStats[]> {
    // TODO: Implement this
    const courseDocStat = {
      courseCode: query.courseCode,
      courseName: 'Computer Networks',
      stats: new Map(
        Object.keys(DOCUMENT_NAMES).map(id => ([id, {
            id,
            courseCode: query.courseCode,
            name: DOCUMENT_NAMES[id],
            status: DocStatus.PRIVATE,
            timestamp: 881818181,
          } as DocumentStat])
        )
      )
    } as CourseDocumentStats;

    if (query.courseCode)
      return of([courseDocStat]);

    return of(new Array(8).fill(courseDocStat));
  }

  getStat(semId: string, courseCode: string, documentId: string): Observable<DocumentStat> {
    // TODO: Implement this
    return of({
      courseCode,
      semId,
      id: documentId,
      name: DOCUMENT_NAMES[documentId],
      status: DocStatus.PRIVATE,
      timestamp: 8818181881,
    });
  }

  getDeptwiseDocSubmissionOverview(semId: string, batchId: string) {
    // TODO: Implement this
    const entries = Object.keys(DEPT_ABBR).map(id => [DEPT_ABBR[id as keyof typeof DEPT_ABBR], randFromRange(0, 100)] as const);
    return of(new Map(entries));
  }

  getMeta<T extends DocumentMeta>(semId: string, courseCode: string, documentId: string, isPrivate = false): Observable<T> {
    // TODO: Implement this
    return of({
      status: DocStatus.PRIVATE,
      timestamp: 8181888811,
      totalClasses: 150,
    } as AttendanceDocMeta as T);
  }

  getEntries<T extends Entry>(semId: string, courseCode: string, documentId: string, isPrivate = false): Observable<T[]> {
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

type Entry = MarklistEntry | AttendanceEntry | GradeEntry

type DocumentMeta = MarklistDocMeta | AttendanceDocMeta | GradesDocMeta
