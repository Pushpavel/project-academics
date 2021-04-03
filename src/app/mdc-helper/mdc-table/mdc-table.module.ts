import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdcTableComponent} from './mdc-table/mdc-table.component';
import {ColumnDirective} from './column.directive';


@NgModule({
  declarations: [
    MdcTableComponent,
    ColumnDirective,
  ],
  exports: [
    MdcTableComponent,
    ColumnDirective
  ],
  imports: [
    CommonModule
  ]
})
export class MdcTableModule {
}
