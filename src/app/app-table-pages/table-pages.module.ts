import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicTableComponent} from './dynamic-table/dynamic-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [DynamicTableComponent],
  exports: [
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
  ]
})
export class TablePagesModule {
}
