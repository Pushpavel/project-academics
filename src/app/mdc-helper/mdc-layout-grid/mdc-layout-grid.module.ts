import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcLayoutComponent } from './mdc-layout.component';
import { MdcCellDirective } from './mdc-cell.directive';
import { LayoutInnerComponent } from './layout-inner.component';



@NgModule({
  declarations: [MdcLayoutComponent, MdcCellDirective, LayoutInnerComponent],
  imports: [
    CommonModule
  ]
})
export class MdcLayoutGridModule { }
