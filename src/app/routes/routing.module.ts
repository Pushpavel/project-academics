import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DevPageComponent} from '../_dev/dev-page/dev-page.component';
import {environment} from '../../environments/environment';
import {HomePageComponent} from '../app-home/home-page/home-page.component';
import {LoginPageComponent} from '../app-auth/login-page/login-page.component';
import {CoursePageComponent} from '../app-course/course-page/course-page.component';
import {PageNotFoundComponent} from '../app-404/page-not-found/page-not-found.component';
import {BatchResultPageComponent} from '../app-result/batch-result-page/batch-result-page.component';
import {StudentResultPageComponent} from '../app-result/student-result-page/student-result-page.component';
import {ROUTING_PARAMS as p} from '@lib/constants/routing.constants';
import {DocumentPageComponent} from '../app-table-pages/document-page/document-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  // {path: 'archive', component: ArchivePageComponent}, TODO: Implement Archive Feature Later
  {path: `:${p.semId}/course/:${p.courseCode}/:${p.documentId}`, component: DocumentPageComponent},
  {path: `:${p.semId}/course/:${p.courseCode}`, component: CoursePageComponent},
  {path: `:${p.semId}/result/:${p.batchId}`, component: BatchResultPageComponent},
  {path: `:${p.semId}/result`, component: StudentResultPageComponent},
  {path: `:${p.semId}/home`, component: HomePageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},// TODO: Redirect to current Sem home
  {path: '**', component: PageNotFoundComponent},
];


if (!environment.production) routes.unshift({path: 'dev', component: DevPageComponent});


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
