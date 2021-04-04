import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';
import { AttendancePageComponent } from './attendance-page/attendance-page.component';
import { GradesPageComponent } from './grades-page/grades-page.component';
import { GradingCriteriaPageComponent } from './grading-criteria-page/grading-criteria-page.component';
import { MarklistPageComponent } from './marklist-page/marklist-page.component';


@NgModule({
  declarations: [
    AttendancePageComponent,
    GradesPageComponent,
    GradingCriteriaPageComponent,
    MarklistPageComponent,
  ],
  imports: [
    CommonModule,
    MdcHelperModule,
  ]
})
export class DocumentPagesModule {
}
