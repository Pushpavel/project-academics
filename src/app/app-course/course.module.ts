import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursePageComponent} from './course-page/course-page.component';
import {SharedModule} from '../shared/shared.module';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';

@NgModule({
  declarations: [
    CoursePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MdcHelperModule,
  ],
  exports: [
    CoursePageComponent
  ]
})
export class CourseModule {
}
