import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopBarLayoutComponent} from './top-bar-layout/top-bar-layout.component';
import {PortalModule} from '@angular/cdk/portal';
import {MdcHelperModule} from '../../mdc-helper/mdc-helper.module';
import {TopBarContentDirective, TopBarLayoutContainerDirective} from './directives';
import {TopBarComponent} from './top-bar/top-bar.component';
import {MatMenuModule} from "@angular/material-experimental/mdc-menu";


@NgModule({
  declarations: [
    TopBarLayoutComponent,
    TopBarLayoutContainerDirective,
    TopBarContentDirective,
    TopBarComponent,
  ],
  exports: [
    TopBarLayoutComponent,
    TopBarContentDirective,
    TopBarLayoutContainerDirective,
  ],
    imports: [
        CommonModule,
        PortalModule,
        MdcHelperModule,
        MatMenuModule
    ]
})
export class TopBarModule {
}
