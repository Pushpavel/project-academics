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
import {ROUTING_PARAMS_AS_OBJECT as p} from '@lib/constants/routing.constants';
import {DocumentPageComponent} from '../app-table-pages/document-page/document-page.component';
import {RegexGuard} from './regex.guard';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},// TODO: Redirect to current Sem home if logged in
  {
    path: `sem/:${p.semId}`,
    canActivate: [RegexGuard],
    children: [
      {path: `home`, component: HomePageComponent},
      {path: `result`, component: StudentResultPageComponent},
      {path: `result/:${p.batchId}`, component: BatchResultPageComponent},
      {path: `course/:${p.courseCode}/:${p.documentId}`, component: DocumentPageComponent},
      {path: `course/:${p.courseCode}`, component: CoursePageComponent},
      {path: ``, redirectTo: 'home', pathMatch: 'full'},
    ]
  },
  {path: '404', component: PageNotFoundComponent},
  {path: ``, redirectTo: 'home', pathMatch: 'full'},// TODO: Redirect to Current Sem Home if Logged In
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
];


if (!environment.production) routes.unshift({path: 'dev', component: DevPageComponent});


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
