import {Component} from '@angular/core';
import {FACULTY_DOCUMENT_GROUPS} from '@lib/constants/document.constants';
import {map, switchMap} from 'rxjs/operators';
import {DocumentService} from '@service/document.service';
import {getParams} from '../../routes/routing.helper';
import {ActivatedRoute, Router} from '@angular/router';
import {StatEntryRaw} from '@lib/models/document/document-stat.model';
import {Observable, of} from 'rxjs';
import {UserCourseRelation} from '@lib/models/course.model';

@Component({
    selector: 'faculty-actions',
    templateUrl: './faculty-actions.component.html',
    styleUrls: ['./faculty-actions.component.scss']
})
export class FacultyActionsComponent {

    params = getParams(['semId', 'courseCode'], this.route);

    documentGroups = this.params.pipe(
        switchMap(params => this.documentService.getCourseDocStat({
            semId: params.semId,
            courseCode: params.courseCode
        })),
        map(courseDocStat => {
            const docs = courseDocStat.stats;

            // maps ids of documents in each document group to CourseDocumentStat
            return FACULTY_DOCUMENT_GROUPS.map(group => {
                const actions = group.actions
                    .map(id => docs[id])
                    .filter(val => val != undefined);

                return {...group, actions} as DocumentGroupUI;
            });
        }),
    );

    userCR: Observable<UserCourseRelation> = of({
        isFaculty: true
    });

    openDocument(docId: string) {
        this.router.navigate([docId], {relativeTo: this.route});
    }

    constructor(
        private documentService: DocumentService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

}


export interface DocumentGroupUI {
    title: string,
    actions: StatEntryRaw[]
}

