import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertDialog} from './alert-dialog/alert-dialog.component';
import {PortalModule} from '@angular/cdk/portal';
import {MatDialogModule} from '@angular/material-experimental/mdc-dialog';
import {MdcHelperModule} from '../mdc-helper.module';


@NgModule({
  declarations: [
    AlertDialog,
  ],
  imports: [
    CommonModule,
    PortalModule,
    MatDialogModule,
    MdcHelperModule,
  ]
})
export class MdcDialogModule {
}
