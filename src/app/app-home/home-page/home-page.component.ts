import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AcademicUser} from '@models/user.model';
import {CourseService} from 'core/course.service';
import {UserService} from 'core/user.service';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {StudentService} from '../../../core/student.service';
import {DeptId} from '../../../lib/models/document/document-base.model';
import {groupBy} from '../../../lib/utils/native/map.utils';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

/**
 * [\] Faculty
 * [\] Student - Redirect is remaining
 * [] Exam cell
 * [] Hod
 *
 * TODO : make tabs feasible
 *
 */

export class HomePageComponent implements OnInit, OnDestroy {

  semId = getParams<{ semId: string }>(['semId'], this.route).pipe(map(p => p.semId));

  // FACULTY AND STUDENT
  userCourses = combineLatest([this.semId, this.user.loggedInUser]).pipe(
    filter(([, user]) => !!(user.isStudent || user.isFaculty)),
    switchMap(([semId, user]) => {
      if (user.isFaculty)
        return this.courseService.getCourses({semId, facultyId: user.uid});

      // get public student entries of student and get courses from that
      return this.studentService.getStudentEntries({semId, rollNo: user.uid}).pipe(
        switchMap(entries => this.courseService.getCourses({semId, courseCodes: entries.map(entry => entry.courseCode)}))
      );
    })
  );

  // HOD
  coursesOfDept = combineLatest([this.semId, this.user.loggedInUser]).pipe(
    filter(([, user]) => !!user.isHod),
    switchMap(([semId, user]) => this.courseService.getCourses({semId, deptId: user.isHod})),
    map(courses => groupBy(courses, course => Object.keys(course.dept)[0])), //  TODO: handle multi-dept courses
  );


  // EXAM CELL
  selectedDept = new BehaviorSubject<DeptId>('CS');

  coursesOfBatch = combineLatest([this.semId, this.selectedDept, this.user.loggedInUser]).pipe(
    filter(([, , user]) => !!user.isExamCell),
    switchMap(([semId, deptId]) => this.courseService.getCourses({semId, deptId})),
    map(courses => groupBy(courses, course => course.batch)),
  );


  courseCollections?: any = null;
  title = '';
  //dummy
  homeTabs: String[] = ['Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5'];

  tabIndex: number = 0;

  private courseSubscription!: Subscription;
  private userSubscription!: Subscription;

  _user?: AcademicUser | null;

  getCourseCollections() {
  }

  authValidate(user: AcademicUser | null) {

    this._user = user;
    if (user?.isFaculty && user?.isHod == undefined) {
      this.courseService.fetchCoursesForFaculty(user.uid, '2020_2');
    }

    if (user?.isHod) {
      this.courseService.fetchCoursesForFaculty(user.uid, '2020_2');
      //fetch hod courses
    }

    if (user?.isStudent) {
      //TODO: student filter params
      this.courseService.fetchCoursesForStudent('19B1', '2020_2');
    }

    if (user?.isExamCell) {
      //exam cell (all)
    }

  }

  ngOnInit(): void {
    this.courseSubscription = this.courseService.courseCollection.subscribe((result) => {
      console.log(result);
      if (result) this.initData(result);
    });
    this.userSubscription = this.user.subscribe(u => {
      this.authValidate(u);
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription)
      this.courseSubscription.unsubscribe();
    if (this.userSubscription)
      this.userSubscription.unsubscribe();
  }

  initData(result: any) {
    this.courseCollections = result;
    this.title = Object.keys(result)[0];
  }

  handletabChange(i: any) {
    this.tabIndex = i;
  }


  handleResultSummary() {
    console.log('result summary', this.tabIndex);
  }

  handleResult() {
    console.log('Result', this.tabIndex);
  }

  handleArchive() {
    //this.userService.signOut(); // Dummy signout
    console.log('archive', this.tabIndex);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService,
    private user: UserService,
  ) {
  }

}
