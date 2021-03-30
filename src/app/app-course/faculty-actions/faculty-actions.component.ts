import {Component} from '@angular/core';
import {FACULTY_DOCUMENT_GROUPS} from '@lib/constants/document.constants';
import {map, switchMap} from 'rxjs/operators';
import {DocumentService} from '@service/document.service';
import {DocumentStat} from '@lib/models/document.model';
import {getParams} from '../../routes/routing.helper';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'faculty-actions',
  templateUrl: './faculty-actions.component.html',
  styleUrls: ['./faculty-actions.component.scss']
})
export class FacultyActionsComponent {

  params = getParams(['semId', 'courseCode'], this.route);

  documentGroups = this.params.pipe(
    switchMap(params => this.documentService.getCourseDocStat(params.semId, params.courseCode)),
    map(courseDocStat => {
      const docs = courseDocStat.stats;

      // maps ids of documents in each document group to CourseDocumentStat
      return FACULTY_DOCUMENT_GROUPS.map(group => {
        const actions = group.actions
          .map(id => docs.get(id))
          .filter(val => val != undefined);

        return {...group, actions} as DocumentGroupUI;
      });
    }),
  );

  openDocument(docId: string) {
    // TODO: navigate to a table page
  }

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
  ) {
  }

}


export interface DocumentGroupUI {
  title: string,
  actions: DocumentStat[]
}

