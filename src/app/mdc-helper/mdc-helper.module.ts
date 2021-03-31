import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdcButtonComponent} from './mdc-button/mdc-button.component';
import {MdcIconComponent} from './mdc-icon/mdc-icon.component';
import {MdcSpinnerComponent} from './mdc-spinner/mdc-spinner.component';
import {MdcTableComponent} from './mdc-table/mdc-table.component';
import {CdkTableModule} from '@angular/cdk/table';
import {MdcTextFieldComponent} from './mdc-text-field/mdc-text-field.component';
import {MdcInputDirective} from './mdc-input/mdc-input.directive';
import { MdcTabsBarComponent } from './mdc-tabs-bar/mdc-tabs-bar.component';


@NgModule({
  declarations: [
    MdcButtonComponent,
    MdcIconComponent,
    MdcSpinnerComponent,
    MdcTableComponent,
    MdcTextFieldComponent,
    MdcInputDirective,
    MdcTabsBarComponent,
  ],
  exports: [
    MdcButtonComponent,
    MdcIconComponent,
    MdcSpinnerComponent,
    MdcTableComponent,
    MdcTextFieldComponent,
    MdcInputDirective,
    MdcTabsBarComponent
  ],
  imports: [
    CommonModule,
    CdkTableModule,
  ]
})
export class MdcHelperModule {
}
