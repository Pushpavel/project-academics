import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[cell],[span],[spanDesktop],[spanTablet],[spanPhone]',
  host: {
    '[class]': `'mdc-layout-grid__cell' + _cssClasses`,
  }
})
export class MdcCellDirective implements OnChanges {

  /**
   * Default cell span , overridden by spanDesktop, spanTablet , spanPhone
   */
  @Input() span?: OneTo12 = 4;

  @Input() spanDesktop?: OneTo12;
  @Input() spanTablet?: OneTo8;
  @Input() spanPhone?: OneTo4;

  _cssClasses = '';

  ngOnChanges(changes: SimpleChanges) {
    this._cssClasses = '';

    this._cssClasses += ` mdc-layout-grid__cell--span-${this.spanDesktop ?? this.span}-desktop`;
    this._cssClasses += ` mdc-layout-grid__cell--span-${this.spanTablet ?? this.span}-tablet`;
    this._cssClasses += ` mdc-layout-grid__cell--span-${this.spanPhone ?? this.span}-phone`;
  }


}


type OneTo12 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type OneTo8 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type OneTo4 = 1 | 2 | 3 | 4
