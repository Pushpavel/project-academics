import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DevPageComponent} from '../_dev/dev-page/dev-page.component';
import {environment} from '../../environments/environment';
import {HomePageComponent} from '../app-home/home-page/home-page.component';
import {LoginPageComponent} from '../app-auth/login-page/login-page.component';
import {CoursePageComponent} from '../app-course/course-page/course-page.component';
import {AttendancePageComponent} from '../app-table-pages/attendance-page/attendance-page.component';
import {MarklistPageComponent} from '../app-table-pages/marklist-page/marklist-page.component';
import {GradesPageComponent} from '../app-table-pages/grades-page/grades-page.component';
import {GradeCriteriaPageComponent} from '../app-grade-criteria/grade-criteria-page/grade-criteria-page.component';
import {PageNotFoundComponent} from '../app-404/page-not-found/page-not-found.component';
import {BatchResultPageComponent} from '../app-result/batch-result-page/batch-result-page.component';
import {StudentResultPageComponent} from '../app-result/student-result-page/student-result-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  // {path: 'archive', component: ArchivePageComponent}, TODO: Implement Archive Feature Later
  {path: ':sem_id/course/:course_code/ATTENDANCE', component: AttendancePageComponent},
  {path: ':sem_id/course/:course_code/GRADING_CRITERIA', component: GradeCriteriaPageComponent},
  {path: ':sem_id/course/:course_code/GRADES', component: GradesPageComponent},
  {path: ':sem_id/course/:course_code/:document_id', component: MarklistPageComponent},
  {path: ':sem_id/course/:course_code', component: CoursePageComponent},
  {path: ':sem_id/result/:batch_id', component: BatchResultPageComponent},
  {path: ':sem_id/result', component: StudentResultPageComponent},
  {path: ':sem_id/home', component: HomePageComponent},
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
