import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DevPageComponent} from './_dev/dev-page/dev-page.component';
import {environment} from '../environments/environment';
import {HomePageComponent} from './app-home/home-page/home-page.component';
import {LoginPageComponent} from './app-auth/login-page/login-page.component';
import {ArchivePageComponent} from './app-archive/archive-page/archive-page.component';
import {CoursePageComponent} from './app-course/course-page/course-page.component';
import {ResultPageComponent} from './app-result/result-page/result-page.component';
import {AttendancePageComponent} from './app-table-pages/attendance-page/attendance-page.component';
import {MarklistPageComponent} from './app-table-pages/marklist-page/marklist-page.component';
import {GradesPageComponent} from './app-table-pages/grades-page/grades-page.component';
import {GradeCriteriaPageComponent} from './app-grade-criteria/grade-criteria-page/grade-criteria-page.component';
import {PageNotFoundComponent} from './app-404/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'course/:course_code/ATTENDANCE', component: AttendancePageComponent},
  {path: 'course/:course_code/GRADING_CRITERIA', component: GradeCriteriaPageComponent},
  {path: 'course/:course_code/GRADES', component: GradesPageComponent},
  {path: 'course/:course_code/:exam_name', component: MarklistPageComponent},
  {path: 'course/:course_code', component: CoursePageComponent},

  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'archive', component: ArchivePageComponent},
  {path: 'result', component: ResultPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];


if (!environment.production) routes.unshift({path: 'dev', component: DevPageComponent});


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
