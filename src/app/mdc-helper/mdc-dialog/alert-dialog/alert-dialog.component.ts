import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material-experimental/mdc-dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogConfig) {
  }
}

export interface AlertDialogConfig {
  message: string,
  action: string,
  cancel?: string,
}
