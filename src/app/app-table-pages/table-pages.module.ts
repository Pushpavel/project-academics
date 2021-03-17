import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { AttendancePageComponent } from './attendance-page/attendance-page.component';
import { MarklistPageComponent } from './marklist-page/marklist-page.component';
import { GradesPageComponent } from './grades-page/grades-page.component';


@NgModule({
  declarations: [AttendancePageComponent, MarklistPageComponent, GradesPageComponent],
  exports: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
  ]
})
export class TablePagesModule {
}
