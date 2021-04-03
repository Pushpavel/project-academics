import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataCardComponent} from './data-card/data-card.component';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';
import {TopBarModule} from './top-bar/top-bar.module';
import { PageTemplateDirective } from './helpers/page-template.directive';
import { EntryComponent } from './entry/entry.component';

@NgModule({
  declarations: [
    DataCardComponent,
    PageTemplateDirective,
    EntryComponent
  ],
    exports: [
        TopBarModule,
        DataCardComponent,
        PageTemplateDirective,
        EntryComponent,
    ],
  imports: [
    CommonModule,
    MdcHelperModule,
    TopBarModule,
  ]
})
export class SharedModule {
}
