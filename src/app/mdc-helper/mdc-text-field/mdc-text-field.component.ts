import {AfterViewInit, Component, ContentChild, ElementRef, HostBinding, Input} from '@angular/core';
import {MdcInputDirective} from '../mdc-input/mdc-input.directive';
import {MDCTextField} from '@material/textfield';

@Component({
  selector: 'label[mdc-text-field]',
  templateUrl: './mdc-text-field.component.html',
  host: {
    '[class]': `'mdc-text-field ' + 'mdc-text-field--' + (filled != null ? 'filled ' : 'outlined ')`,
  }
})
export class MdcTextFieldComponent implements AfterViewInit {

  @Input() filled?: any;

  @Input() label?: string;

  @ContentChild(MdcInputDirective) input?: MdcInputDirective;

  @HostBinding('class.mdc-text-field--no-label') get noLabelClass() {
    return this.label == null;
  };

  @HostBinding('class.mdc-text-field--textarea') get textareaClass() {
    return this.input?.isTextArea;
  };

  @HostBinding('class.mdc-text-field--disabled') get disabledClass() {
    return this.input?.disabled;
  };

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    MDCTextField.attachTo(this.elementRef.nativeElement);
  }

}
