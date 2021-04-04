import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdcLayoutDirective} from './mdc-layout.directive';
import {MdcCellDirective} from './mdc-cell.directive';


@NgModule({
  declarations: [
    MdcLayoutDirective,
    MdcCellDirective,
  ],
  exports: [
    MdcCellDirective,
    MdcLayoutDirective
  ],
  imports: [
    CommonModule
  ]
})
export class MdcLayoutGridModule {
}
