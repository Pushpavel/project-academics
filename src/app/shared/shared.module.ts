import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopBarComponent} from './top-bar/top-bar.component';
import {DataCardComponent} from './data-card/data-card.component';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';

@NgModule({
  declarations: [TopBarComponent, DataCardComponent],
  exports: [
    TopBarComponent,
    DataCardComponent,
  ],
  imports: [
    CommonModule,
    MdcHelperModule
  ]
})
export class SharedModule {
}
