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
import {documentPageRoutes} from './document-page.routing';
import {authGuard, AuthPipeGuard} from './auth-pipe.guard';
import {pipe} from 'rxjs';
import {elseRedirectTo, elseStay, loggedIn, thenRedirectToHome} from './routing.pipes';
import {regexGuard, RegexGuard} from './regex.guard';
import {UserCrResolver} from './user-cr.resolver';

// UTIL PIPES
const redirectLoggedInToHome = authGuard(() => pipe(
  loggedIn,
  thenRedirectToHome,
  elseStay,
));

const redirectUnAuthorizedToLogin = () => pipe(
  loggedIn,
  elseRedirectTo('/login')
);

const redirectByAuth = authGuard(() => pipe(
  loggedIn,
  thenRedirectToHome,
  elseRedirectTo('/login')
));


// CHILD ROUTES UNDER 'sem/:semId'
const routesUnderSem = [
  {path: `home`, component: HomePageComponent},
  {path: `result`, component: StudentResultPageComponent},
  {
    path: `result/:${p.batchId}`,
    ...regexGuard(p.batchId),
    component: BatchResultPageComponent
  },
  {
    path: `course/:${p.courseCode}`,
    ...regexGuard(p.courseCode),
    children: [
      ...documentPageRoutes,
      {path: ``, component: CoursePageComponent, resolve: {userCrResolve: UserCrResolver}, pathMatch: 'full'},
    ]
  },
  {path: ``, redirectTo: 'home', pathMatch: 'full'},
];


// ROOT ROUTES
const routes: Routes = [
  {path: 'login', component: LoginPageComponent, ...redirectLoggedInToHome},
  {
    path: `sem/:${p.semId}`,
    canActivate: [RegexGuard, AuthPipeGuard],
    data: {
      authGuardPipe: redirectUnAuthorizedToLogin,
      regexGuardParamId: p.semId
    },
    children: routesUnderSem
  },
  {path: '404', component: PageNotFoundComponent},
  {
    path: ``,
    pathMatch: 'full',
    ...redirectByAuth,
    component: PageNotFoundComponent
  },
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
];


if (!environment.production) routes.unshift({path: 'dev', component: DevPageComponent});


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
