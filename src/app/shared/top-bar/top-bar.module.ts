import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopBarLayoutComponent} from './top-bar-layout/top-bar-layout.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {PortalModule} from '@angular/cdk/portal';
import {MdcHelperModule} from '../../mdc-helper/mdc-helper.module';


@NgModule({
  declarations: [
    TopBarLayoutComponent,
    TopBarComponent,
  ],
  exports: [
    TopBarComponent,
    TopBarLayoutComponent,
  ],
  imports: [
    CommonModule,
    PortalModule,
    MdcHelperModule
  ]
})
export class TopBarModule {
}
