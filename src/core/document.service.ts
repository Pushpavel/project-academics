import {Injectable} from '@angular/core';
import {MarklistEntry} from '@lib/models/marklist.model';
import {AttendanceEntry} from '@lib/models/attendance.model';
import {Observable, of} from 'rxjs';
import {GradeEntry} from '@lib/models/grading.model';
import {randFromRange} from '@lib/utils/number.util';
import {CourseDocumentStat} from '@lib/models/course.model';
import DOCUMENT_NAMES from '@lib/constants/document.constants';
import {DocStatus} from '@lib/models/other.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  getStat(courseCode: string, documentId: string, isPrivate = false): Observable<CourseDocumentStat> {
    // TODO: Implement this
    return of({
      courseCode,
      id: documentId,
      name: DOCUMENT_NAMES[documentId],
      status: DocStatus.PRIVATE,
      timestamp: 881818181,
      privateTimestamp: 34523134234,
    } as CourseDocumentStat);
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
