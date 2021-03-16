import {Directive, ElementRef, HostBinding, OnInit} from '@angular/core';

/**
 * Using this directive as a marker for mdc-text-field
 */
@Directive({
  selector: 'input[mdc-input],textarea[mdc-input]',
  host: {
    class: 'mdc-text-field__input'
  }
})
export class MdcInputDirective implements OnInit {

  isTextArea = false;

  @HostBinding('attr.disabled') disabled?: boolean;

  constructor(private elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {
  }

  ngOnInit() {
    this.isTextArea = this.elementRef.nativeElement.tagName == 'TEXTAREA';
  }

}
