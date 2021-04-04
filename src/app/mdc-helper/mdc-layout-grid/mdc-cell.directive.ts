import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';

type OneToTwelve = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

@Directive({
  selector: '[cell],[span]',
  host: {
    class: 'mdc-layout-grid__cell',
  }
})
export class MdcCellDirective implements OnChanges {

  _cssClasses = '';

  @Input() span?: OneToTwelve;
  @Input() order?: OneToTwelve;
  @Input() align?: 'top' | 'middle' | 'bottom';

  @Input() spanDesktop?: OneToTwelve;
  @Input() spanTablet?: OneToTwelve;
  @Input() spanPhone?: OneToTwelve;

  ngOnChanges(changes: SimpleChanges) {
    this._cssClasses = '';

    if (this.span)
      this._cssClasses += ` mdc-layout-grid__cell--span-${this.span}`;
    if (this.spanDesktop)
      this._cssClasses += ` mdc-layout-grid__cell--span-${this.spanDesktop}-desktop`;
    if (this.spanTablet)
      this._cssClasses += ` mdc-layout-grid__cell--span-${this.spanTablet}-tablet`;
    if (this.spanPhone)
      this._cssClasses += ` mdc-layout-grid__cell--span-${this.spanPhone}-phone`;

    if (this.order)
      this._cssClasses += ` mdc-layout-grid__cell--order-${this.order}`;

    if (this.align)
      this._cssClasses += ` mdc-layout-grid__cell--align-${this.align}`;
  }


}
