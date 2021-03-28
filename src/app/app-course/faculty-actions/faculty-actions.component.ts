import {Component, Input} from '@angular/core';
import {CourseDocumentStat} from '@lib/models/course.model';
import {FACULTY_DOCUMENT_GROUPS} from '@lib/constants/document.constants';
import {CourseService} from '@service/course.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'faculty-actions',
  templateUrl: './faculty-actions.component.html',
  styleUrls: ['./faculty-actions.component.scss']
})
export class FacultyActionsComponent {

  documentGroups?: Observable<DocumentGroupUI[]>;

  @Input() set courseCode(courseCode: string | null) {
    if (!courseCode) return;

    this.documentGroups = this.courseService.getCourseDocumentStats(courseCode)
      .pipe(
        map(docs => FACULTY_DOCUMENT_GROUPS.map(group => {
          // maps ids of documents in each document group to CourseDocumentStat
          const actions = group.actions
            .map(id => docs.find(doc => doc.id == id))
            .filter(val => val != undefined);

          return {...group, actions} as DocumentGroupUI;
        }))
      );
  }


  openDocument(docId: string) {
    // TODO: navigate to a table page
  }

  constructor(private courseService: CourseService) {
  }

}


export interface DocumentGroupUI {
  title: string,
  actions: CourseDocumentStat[]
}

