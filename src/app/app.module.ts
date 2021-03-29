import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RoutingModule} from './routes/routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {_DevModule} from './_dev/_dev.module';
import {environment} from '../environments/environment';
import {ArchiveModule} from './app-archive/archive.module';
import {AuthModule} from './app-auth/auth.module';
import {CourseModule} from './app-course/course.module';
import {GradeCriteriaModule} from './app-grade-criteria/grade-criteria.module';
import {HomeModule} from './app-home/home.module';
import {ResultModule} from './app-result/result.module';
import {TablePagesModule} from './app-table-pages/table-pages.module';
import {SharedModule} from './shared/shared.module';

const CORE_MODULES = [
  BrowserModule,
  RoutingModule,
  BrowserAnimationsModule,
];

const FEATURE_MODULES = [
  ArchiveModule,
  AuthModule,
  CourseModule,
  GradeCriteriaModule,
  HomeModule,
  ResultModule,
  TablePagesModule,
];

if (!environment.production) CORE_MODULES.push(_DevModule);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [...CORE_MODULES, ...FEATURE_MODULES, SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
