import {Injectable} from '@angular/core';
import {AlertDialog, AlertDialogConfig} from './alert-dialog/alert-dialog.component';
import {MatDialog} from '@angular/material-experimental/mdc-dialog';
import {NoopScrollStrategy} from '@angular/cdk/overlay';
import {MdcDialogModule} from './mdc-dialog.module';
import {getValue} from '@utils/rxjs.utils';

@Injectable({
  providedIn: MdcDialogModule
})
export class MdcDialog {


  async alert(config: AlertDialogConfig) {
    const [confirm] = await getValue(this.dialog.open(AlertDialog, {
      data: config,
      scrollStrategy: new NoopScrollStrategy(),
    }).afterClosed());

    return !!confirm;
  }

  constructor(private dialog: MatDialog) {
  }
}
