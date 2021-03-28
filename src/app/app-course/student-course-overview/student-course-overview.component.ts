import {Component, Input} from '@angular/core';
import {StudentAttendanceEntry, StudentMarkEntry} from '@lib/models/student.model';
import {Observable} from 'rxjs';
import {StudentService} from '@service/student.service';

@Component({
  selector: 'student-course-overview',
  templateUrl: './student-course-overview.component.html',
  styleUrls: ['./student-course-overview.component.scss']
})
export class StudentCourseOverviewComponent {

  courseOverview?: Observable<CourseOverviewUI>;

  @Input() set courseCode(courseCode: string | null) {
    if (!courseCode) return;

    // TODO: Get roll no from user service
    this.courseOverview = this.studentService.getCourseOverview('CS19B1042', courseCode);
  }

  constructor(private studentService: StudentService) {
  }

}

export interface CourseOverviewUI {
  attendanceEntry: StudentAttendanceEntry,
  markEntries: StudentMarkEntry[],
}
