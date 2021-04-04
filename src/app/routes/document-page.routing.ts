import {Routes, UrlMatcher} from '@angular/router';
import {DocumentId} from '@lib/models/document.model';
import {ROUTING_PARAMS_AS_OBJECT as p} from '@lib/constants/routing.constants';
import {RegexGuard} from './regex.guard';
import {AttendancePageComponent} from '../app-document-pages/attendance-page/attendance-page.component';
import {GradesPageComponent} from '../app-document-pages/grades-page/grades-page.component';
import {GradingCriteriaPageComponent} from '../app-document-pages/grading-criteria-page/grading-criteria-page.component';
import {MarklistPageComponent} from '../app-document-pages/marklist-page/marklist-page.component';

export const documentPageRoutes: Routes = [
  {...documentIdMatcher('ATTENDANCE'), component: AttendancePageComponent},
  {...documentIdMatcher('GRADES'), component: GradesPageComponent},
  {...documentIdMatcher('GRADING_CRITERIA'), component: GradingCriteriaPageComponent},
  {path: `:${p.documentId}`, canActivate: [RegexGuard], component: MarklistPageComponent},
];


function documentIdMatcher(id: DocumentId): { matcher: UrlMatcher, canActivate: any[] } {
  return {
    matcher: (segments) => {
      if (segments.length != 1 || segments[0].path != id)
        return null;
      return ({
        consumed: segments,
        posParams: {[p.documentId]: segments[0]}
      });
    },
    canActivate: [RegexGuard]
  };
}
