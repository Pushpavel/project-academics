import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursePageComponent} from './course-page/course-page.component';
import {SharedModule} from '../shared/shared.module';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';
import {FacultyActionsComponent} from './faculty-actions/faculty-actions.component';
import {StudentCourseOverviewComponent} from './student-course-overview/student-course-overview.component';

@NgModule({
  declarations: [
    CoursePageComponent,
    FacultyActionsComponent,
    StudentCourseOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MdcHelperModule,
  ],
  exports: [
    CoursePageComponent,
    StudentCourseOverviewComponent
  ]
})
export class CourseModule {
}
