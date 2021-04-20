import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdcDialogModule} from '../mdc-helper/mdc-dialog/mdc-dialog.module';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';
import {MdcTableModule} from '../mdc-helper/mdc-table/mdc-table.module';
import {AttendancePageComponent} from './attendance-page/attendance-page.component';
import {GradesPageComponent} from './grades-page/grades-page.component';
import {GradingCriteriaPageComponent} from './grading-criteria-page/grading-criteria-page.component';
import {MarklistPageComponent} from './marklist-page/marklist-page.component';
import {TopBarModule} from '../shared/top-bar/top-bar.module';
import { DocumentHeaderComponent } from './document-header/document-header.component';


@NgModule({
  declarations: [
    AttendancePageComponent,
    GradesPageComponent,
    GradingCriteriaPageComponent,
    MarklistPageComponent,
    DocumentHeaderComponent,
  ],
  imports: [
    CommonModule,
    MdcHelperModule,
    TopBarModule,
    MdcTableModule,
    MdcDialogModule,
  ]
})
export class DocumentPagesModule {
}
