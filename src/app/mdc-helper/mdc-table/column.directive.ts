import {Directive, Input} from '@angular/core';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';

@Directive({
  selector: 'column'
})
export class ColumnDirective<T> {
  @Input() key!: string;
  @Input() label!: string;

  _numeric?: boolean;
  _editable?: boolean;

  @Input() set numeric(value: BooleanInput) {
    this._numeric = coerceBooleanProperty(value);
  }

  @Input() set editable(value: BooleanInput) {
    this._editable = coerceBooleanProperty(value);
  }
}
