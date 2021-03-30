import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdcHelperModule} from '../mdc-helper/mdc-helper.module';
import {HeaderTileComponent} from './header-tile/header-tile.component';
import {DocumentPageComponent} from './document-page/document-page.component';


@NgModule({
  declarations: [
    HeaderTileComponent,
    DocumentPageComponent,
  ],
  imports: [
    CommonModule,
    MdcHelperModule,
  ]
})
export class TablePagesModule {
}
