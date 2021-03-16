import {AfterViewInit, Component, ElementRef, Input} from '@angular/core';
import {MDCRipple} from '@material/ripple';

type ButtonVariant = '' | 'outlined' | 'raised';

/**
 * IMPORTANT
 * use <label> tag when the button has trailing icon
 * @param flex for customizing padding and display
 */

@Component({
  selector: 'button[mdc-button]',
  template: `
    <span class="mdc-button__ripple"></span>
    <ng-content></ng-content>
  `,
  host: {
    '[class]': `'mdc-button ' + variant_class + ' ' + flex_class`
  }
})
export class MdcButtonComponent implements AfterViewInit {


  @Input('mdc-button') variant: ButtonVariant = '';
  @Input() flex?: any;

  get variant_class() {
    return (this.variant == '') ? '' : ('mdc-button--' + this.variant);
  }

  get flex_class() {
    return this.flex != null ? 'mdc-button-display--flex' : '';
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    MDCRipple.attachTo(this.elementRef.nativeElement);
  }

}
