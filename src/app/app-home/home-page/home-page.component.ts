import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from 'core/course.service';
import {UserService} from 'core/user.service';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {StudentService} from '../../../core/student.service';
import {getBatchId, getBatchName} from '../../../lib/utils/batch.utils';
import {groupBy} from '../../../lib/utils/native/map.utils';
import {getValue} from '../../../lib/utils/rxjs.utils';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  getBatchName = getBatchName;

  semId = getParams<{ semId: string }>(['semId'], this.route).pipe(map(p => p.semId));

  // FACULTY AND STUDENT
  userCourses = combineLatest([this.semId, this.user.loggedInUser]).pipe(
    filter(([, user]) => !!(user.isStudent || user.isFaculty)),
    switchMap(([semId, user]) => {
      if (user.isFaculty)
        return this.courseService.getCourses({semId, facultyId: user.uid});

      // get public student entries of student and get courses from that
      return this.studentService.getStudentEntries({semId, rollNo: user.uid}).pipe(
        switchMap(entries => this.courseService.getCourses({semId, courseCodes: entries.map(entry => entry.courseCode)})),
      );
    })
  );

  // HOD
  coursesOfDept = combineLatest([this.semId, this.user.loggedInUser]).pipe(
    filter(([, user]) => !!user.isHod),
    switchMap(([semId, user]) => this.courseService.getCourses({semId, deptId: user.isHod})),
    map(courses => groupBy(courses, course => course.batch)),
  );


  // EXAM CELL
  selectedBatchName = new BehaviorSubject<string>('B TECH I');

  batches = ['B TECH I', 'B TECH II', 'B TECH III', 'B TECH IV'];

  coursesOfBatch = combineLatest([this.semId, this.selectedBatchName, this.user.loggedInUser]).pipe(
    filter(([, , user]) => !!user.isExamCell),
    switchMap(([semId, batchName]) => this.courseService.getCourses({semId, batch: getBatchId(semId, batchName)})),
    map(courses => groupBy(courses, course => Object.keys(course.dept)[0])), //  TODO: handle multi-dept courses
  );

  openCourse(courseCode: string) {
    this.router.navigate(['../course', courseCode], {relativeTo: this.route});
  }

  async openResultSummary() {
    const user = await getValue(this.user);
    if (user?.isExamCell) {
      if (!this.selectedBatchName.value) return;
      const semId = await getValue(this.semId);
      const batchId = getBatchId(semId, this.selectedBatchName.value);

      this.router.navigate(['../result', batchId], {relativeTo: this.route});
    } else if (user?.isStudent)
      this.router.navigate(['../result'], {relativeTo: this.route});

  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService,
    public user: UserService,
  ) {
  }

}
