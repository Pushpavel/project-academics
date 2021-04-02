import {Component} from '@angular/core';
import {DocumentPageComponent} from '../document-page/document-page.component';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss']
})
export class AttendancePageComponent extends DocumentPageComponent {

  entries = this.params.pipe(
    switchMap(params => this.documentService.getPrivateAttendanceEntries({
      semId: params.semId,
      courseCode: params.courseCode
    }))
  );

}
