import {Component} from '@angular/core';
import {StudentService} from '@service/student.service';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-student-result-page',
  templateUrl: './student-result-page.component.html',
  styleUrls: ['./student-result-page.component.scss']
})
export class StudentResultPageComponent {

  rollNo = of('CS19B1042'); // TODO: Prepare student data

  result = this.rollNo.pipe(
    switchMap(rollNo => this.studentService.getResult(rollNo))
  );

  courseResults = this.rollNo.pipe(
    switchMap(rollNo => this.studentService.getCourseResults(rollNo))
  );

  constructor(
    private studentService: StudentService,
  ) {
  }

}
