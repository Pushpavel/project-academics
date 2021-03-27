import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendancePageComponent} from './attendance-page/attendance-page.component';
import {MarklistPageComponent} from './marklist-page/marklist-page.component';
import {GradesPageComponent} from './grades-page/grades-page.component';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';


@NgModule({
  declarations: [
    AttendancePageComponent,
    MarklistPageComponent,
    GradesPageComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    MdcHelperModule,
  ]
})
export class TablePagesModule {
}
