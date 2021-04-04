import {Component, Input} from '@angular/core';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'mdc-layout-grid',
  template: `
    <div class="mdc-layout-grid__inner">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    class: 'mdc-layout-grid',
    '[class.mdc-layout-grid--fixed-column-width]': '_fixedColWidth',
    '[class.mdc-layout-grid--align-left]': `align == 'left'`,
    '[class.mdc-layout-grid--align-right]': `align == 'right'`
  }
})
export class MdcLayoutComponent {

  _fixedColWidth?: boolean;

  @Input() align?: 'left' | 'right';

  @Input() set fixedColWidth(value: BooleanInput) {
    this._fixedColWidth = coerceBooleanProperty(value);
  }
}

export function mdcLayout(align?: 'left' | 'right', fixedColWidth?: boolean) {
  let alignClass = '';
  if (align) alignClass = (align == 'left') ? 'mdc-layout-grid--align-left ' : 'mdc-layout-grid--align-right ';
  return 'mdc-layout-grid ' + alignClass + (fixedColWidth ? 'mdc-layout-grid--fixed-column-width' : '');
}
