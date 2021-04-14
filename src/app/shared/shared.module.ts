import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataCardComponent} from './data-card/data-card.component';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';
import {TopBarModule} from './top-bar/top-bar.module';
import {EntryComponent} from './entry/entry.component';
import {MatMenuModule} from '@angular/material-experimental/mdc-menu';

@NgModule({
  declarations: [
    DataCardComponent,
    EntryComponent
  ],
  exports: [
    TopBarModule,
    DataCardComponent,
    EntryComponent,
  ],
  imports: [
    CommonModule,
    MdcHelperModule,
    TopBarModule,
    MatMenuModule,
  ]
})
export class SharedModule {
}
