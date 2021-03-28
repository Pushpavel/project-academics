import {Component, Input} from '@angular/core';
import {CourseDocumentStat} from '@lib/models/course.model';
import {FACULTY_DOCUMENT_GROUPS} from '@lib/constants/document.constants';

@Component({
  selector: 'faculty-actions',
  templateUrl: './faculty-actions.component.html',
  styleUrls: ['./faculty-actions.component.scss']
})
export class FacultyActionsComponent {

  documentGroups?: DocumentGroupUI[];

  @Input()
  set documentStats(docs: CourseDocumentStat[] | null) {
    console.log('Wor');
    if (docs == null) {
      this.documentGroups = undefined;
      return;
    }

    this.documentGroups = FACULTY_DOCUMENT_GROUPS.map(group => {
      const actions = group.actions
        .map(id => docs.find(doc => doc.id == id))
        .filter(val => val != undefined);

      return {...group, actions};
    }) as DocumentGroupUI[];
  }

  openDocument(docId: string) {
    // TODO: navigate to a table page
  }

}


export interface DocumentGroupUI {
  title: string,
  actions: CourseDocumentStat[]
}

