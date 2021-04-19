import {Directive, Input} from '@angular/core';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {CellContext} from './mdc-table/mdc-table.component';

@Directive({
  selector: 'column'
})
export class ColumnDirective<T extends Readonly<T>> {
  @Input() key!: keyof T;
  @Input() label!: string;
  @Input() compute?: ComputeColumn<T>;

  _numeric?: boolean;
  _editable?: boolean;

  @Input() set numeric(value: BooleanInput) {
    this._numeric = coerceBooleanProperty(value);
  }

  @Input() set editable(value: BooleanInput) {
    this._editable = coerceBooleanProperty(value);
  }
}

export type ComputeColumn<T extends Readonly<T>> = (context: CellContext<T>) => string | number | undefined;
