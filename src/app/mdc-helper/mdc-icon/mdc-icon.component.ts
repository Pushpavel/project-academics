import {Component, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import {MDCRipple} from '@material/ripple';

@Component({
  selector: 'mdc-icon,button[mdc-icon]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class]': `'material-icons ' + ((isButton) ? 'mdc-icon-button' : '')`
  }
})
export class MdcIconComponent implements OnInit {
  @Input() size?: number;

  @HostBinding('style.font-size') get font_size() {
    return this.size ? (this.size + 'px') : null;
  }

  @HostBinding('style.width') get width() {
    return this.size ? this.size * (this.isButton ? 2 : 1) + 'px' : null;
  }

  @HostBinding('style.height') get height() {
    return this.size ? this.size * (this.isButton ? 2 : 1) + 'px' : null;
  }


  isButton = false;

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {
  }

  ngOnInit() {
    this.isButton = this.elementRef.nativeElement.tagName == 'BUTTON';
    if (this.isButton)
      MDCRipple.attachTo(this.elementRef.nativeElement, {isUnbounded: true});
  }

}
