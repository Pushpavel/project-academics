import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CourseOverviewUI} from '../app/app-course/student-course-overview/student-course-overview.component';
import {STUDENT_MARK_NAMES} from '@lib/constants/student.constants';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  getCourseOverview(rollNo: string, courseCode: string): Observable<CourseOverviewUI> {
    // TODO: implement this
    return of({
      attendanceEntry: {
        percentage: 45,
        attendedClasses: 100,
        totalClasses: 500,
        timestamp: 51881818,
      },
      markEntries: Object.keys(STUDENT_MARK_NAMES).map(documentId => ({
        documentId,
        documentName: STUDENT_MARK_NAMES[documentId],
        mark: 84,
        totalMark: 100,
        timestamp: 844848888,
      }))
    });
  }
}
