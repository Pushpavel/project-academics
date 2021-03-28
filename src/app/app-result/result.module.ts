import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentResultPageComponent} from './student-result-page/student-result-page.component';
import {BatchResultPageComponent} from './batch-result-page/batch-result-page.component';


@NgModule({
  declarations: [
    StudentResultPageComponent,
    BatchResultPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ResultModule {
}
