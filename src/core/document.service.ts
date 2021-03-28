import {Injectable} from '@angular/core';
import {MarklistDocMeta, MarklistEntry} from '@lib/models/marklist.model';
import {AttendanceDocMeta, AttendanceEntry} from '@lib/models/attendance.model';
import {Observable, of} from 'rxjs';
import {GradeEntry, GradesDocMeta} from '@lib/models/grading.model';
import {randFromRange} from '@lib/utils/number.util';
import {CourseDocumentStat} from '@lib/models/course.model';
import DOCUMENT_NAMES from '@lib/constants/document.constants';
import {DocStatus} from '@lib/models/other.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  getStat(courseCode: string, documentId: string): Observable<CourseDocumentStat> {
    // TODO: Implement this
    return of({
      courseCode,
      id: documentId,
      name: DOCUMENT_NAMES[documentId],
      status: DocStatus.PRIVATE,
      timestamp: 881818181,
    } as CourseDocumentStat);
  }

  getMeta<T extends DocumentMeta>(courseCode: string, documentId: string, isPrivate = false): Observable<T> {
    // TODO: Implement this
    return of({
      status: DocStatus.PRIVATE,
      timestamp: 8181888811,
      totalClasses: 150,
    } as AttendanceDocMeta as T);
  }

  getEntries<T extends Entry>(courseCode: string, documentId: string, isPrivate = false): Observable<T[]> {
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
