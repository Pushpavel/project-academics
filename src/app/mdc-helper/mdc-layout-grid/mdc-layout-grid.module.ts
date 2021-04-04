import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdcLayoutComponent} from './mdc-layout.component';
import {MdcCellDirective} from './mdc-cell.directive';
import {InnerLayoutComponent} from './inner-layout.component';


@NgModule({
  declarations: [
    MdcLayoutComponent,
    MdcCellDirective,
    InnerLayoutComponent
  ],
  exports: [
    InnerLayoutComponent,
    MdcCellDirective
  ],
  imports: [
    CommonModule
  ]
})
export class MdcLayoutGridModule {
}
