import {Component} from '@angular/core';
import {StudentService} from 'core/student.service';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from '../../../core/user.service';

@Component({
  selector: 'app-student-result-page',
  templateUrl: './student-result-page.component.html',
  styleUrls: ['./student-result-page.component.scss']
})
export class StudentResultPageComponent {

  rollNo = this.user.loggedInUser.pipe(map(u => u?.uid ?? 'ERROR')); // TODO: handle this

  result = this.rollNo.pipe(
    switchMap(rollNo => this.studentService.getResult(rollNo))
  );

  courseResults = this.rollNo.pipe(
    switchMap(rollNo => this.studentService.getCourseResults(rollNo))
  );

  constructor(
    private studentService: StudentService,
    private user: UserService,
  ) {
  }

}
