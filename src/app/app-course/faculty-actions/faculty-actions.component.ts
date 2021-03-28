import {Component, Input} from '@angular/core';
import {FACULTY_DOCUMENT_GROUPS} from '@lib/constants/document.constants';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DocumentService} from '@service/document.service';
import {DocumentStat} from '@lib/models/document.model';

@Component({
  selector: 'faculty-actions',
  templateUrl: './faculty-actions.component.html',
  styleUrls: ['./faculty-actions.component.scss']
})
export class FacultyActionsComponent {

  documentGroups?: Observable<DocumentGroupUI[]>;

  @Input() set courseCode(courseCode: string | null) {
    if (!courseCode) return;

    this.documentGroups = this.documentService.getCourseDocStats({courseCode})
      .pipe(
        map(courseDocStats => courseDocStats[0].stats),
        map(docs => FACULTY_DOCUMENT_GROUPS.map(group => {
          // maps ids of documents in each document group to CourseDocumentStat
          const actions = group.actions
            .map(id => docs.get(id))
            .filter(val => val != undefined);

          return {...group, actions} as DocumentGroupUI;
        }))
      );
  }


  openDocument(docId: string) {
    // TODO: navigate to a table page
  }

  constructor(private documentService: DocumentService) {
  }

}


export interface DocumentGroupUI {
  title: string,
  actions: DocumentStat[]
}

