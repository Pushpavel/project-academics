import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseGridComponent} from './course-grid/course-grid.component';
import {HomePageComponent} from './home-page/home-page.component';
import {CourseButtonComponent} from './course-button/course-button.component';
import {BrowserAnimationsModule,} from '@angular/platform-browser/animations';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';
import { BatchGridComponent } from './batch-grid/batch-grid.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    CourseGridComponent,
    HomePageComponent,
    CourseButtonComponent,
    BatchGridComponent,
  ],
  exports: [
    HomePageComponent,
    CourseButtonComponent,
    CourseGridComponent
  ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MdcHelperModule,
        SharedModule,
    ]

})
export class HomeModule {
}
