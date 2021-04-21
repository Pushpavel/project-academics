import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from 'core/student.service';
import {combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from 'core/user.service';
import {StudentResult} from '../../../lib/models/student.model';
import {pointFromGrade} from '../../../lib/utils/grades.utils';
import {getParams} from '../../routes/routing.helper';

@Component({
  selector: 'app-student-result-page',
  templateUrl: './student-result-page.component.html',
  styleUrls: ['./student-result-page.component.scss']
})
export class StudentResultPageComponent {

  semId = getParams<{ semId: string }>(['semId'], this.route).pipe(
    map(p => p.semId)
  );

  rollNo = this.user.loggedInUser.pipe(map(u => u.uid));

  courseResults = combineLatest([this.semId, this.rollNo]).pipe(
    switchMap(([semId, rollNo]) =>
      this.studentService.getStudentEntries({semId, rollNo}) as Observable<StudentResult[]>
    ),
  );

  result = this.courseResults.pipe(
    map(results => {
      let totalCredits = 0, gpa = 0;
      for (const result of results) {
        totalCredits += result.credits;
        gpa += pointFromGrade(result.entries.GRADES.grade) * result.credits; // TODO: what happens to failed courses in gpa calculation
      }

      return {
        totalCredits,
        gpa: gpa / totalCredits,
      };
    })
  );

  openCourse(courseCode: string) {
    this.router.navigate(['../course', courseCode], {relativeTo: this.route});
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private user: UserService,
  ) {
  }

}
