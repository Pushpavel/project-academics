import {AfterViewInit, Component, ContentChild, ElementRef, HostBinding, Input} from '@angular/core';
import {MdcInputDirective} from '../mdc-input/mdc-input.directive';
import {MDCTextField} from '@material/textfield';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'label[mdc-text-field]',
  templateUrl: './mdc-text-field.component.html',
  host: {
    '[class]': `'mdc-text-field ' + 'mdc-text-field--' + (isFilled ? 'filled ' : 'outlined ')`,
  }
})
export class MdcTextFieldComponent implements AfterViewInit {

  @Input() filled?: BooleanInput;

  @Input() label?: string;

  @ContentChild(MdcInputDirective) input?: MdcInputDirective;

  @HostBinding('class.numeric') get numeric() {
    return this.input?.type == 'number';
  }

  @HostBinding('class.mdc-text-field--no-label') get noLabelClass() {
    return this.label == null;
  };

  @HostBinding('class.mdc-text-field--textarea') get textareaClass() {
    return this.input?.isTextArea;
  };

  @HostBinding('class.mdc-text-field--disabled') get disabledClass() {
    return this.input?.disabled;
  };


  get isFilled() {
    return coerceBooleanProperty(this.filled);
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    if (!this.input)
      throw new Error('mdc-text-field does not contain mdc-input');

    MDCTextField.attachTo(this.elementRef.nativeElement);
  }

}
