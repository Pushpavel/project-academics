import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CourseOverviewUI} from '../app/app-course/student-course-overview/student-course-overview.component';
import {STUDENT_MARK_NAMES} from 'lib/constants/student.constants';
import {StudentCourseResult, StudentSemResult} from 'lib/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  getCourseOverview(semId: string, rollNo: string, courseCode: string): Observable<CourseOverviewUI> {
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

  getResult(rollNo: string): Observable<StudentSemResult> {
    // TODO: Implement this
    return of({
      gpa: 9.8,
      credits: 23,
    });
  }

  getCourseResults(rollNo: string): Observable<StudentCourseResult[]> {
    // TODO: Implement this
    return of(new Array(8).fill({
      courseName: 'Computer Networks',
      code: 'CS208',
      grade: 'S',
      credits: 3,
    }));
  }
}
