import {Directive, ElementRef} from '@angular/core';

/**
 * Using this directive as a marker for mdc-text-field
 */
@Directive({
  selector: 'input[mdc-input],textarea[mdc-input]',
  host: {
    class: 'mdc-text-field__input'
  }
})
export class MdcInputDirective {

  get isTextArea() {
    return this.elementRef.nativeElement.tagName == 'TEXTAREA';
  }

  get disabled() {
    return this.elementRef.nativeElement.disabled;
  }

  get type() {
    return this.elementRef.nativeElement.type;
  };

  constructor(private elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {
  }

}
