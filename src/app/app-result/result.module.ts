import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentResultPageComponent} from './student-result-page/student-result-page.component';
import {BatchResultPageComponent} from './batch-result-page/batch-result-page.component';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        StudentResultPageComponent,
        BatchResultPageComponent
    ],
    exports: [
        BatchResultPageComponent
    ],
  imports: [
    CommonModule,
    MdcHelperModule,
    SharedModule
  ]
})
export class ResultModule {
}
