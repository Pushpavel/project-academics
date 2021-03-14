import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdcButtonComponent} from './mdc-button/mdc-button.component';
import { MdcIconComponent } from './mdc-icon/mdc-icon.component';
import { MdcSpinnerComponent } from './mdc-spinner/mdc-spinner.component';


@NgModule({
  declarations: [MdcButtonComponent, MdcIconComponent, MdcSpinnerComponent],
    exports: [MdcButtonComponent, MdcIconComponent, MdcSpinnerComponent],
  imports: [
    CommonModule
  ]
})
export class MdcHelperModule {
}
