import {Directive, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[span],[span.lg],[span.md],[span.sm],[span.xs]',
  host: {'[class]': '_class'}
})
export class MdcCellDirective implements OnChanges {

  @Input('span') span?: OneTo12;
  @Input('span.lg') spanLg?: OneTo12;
  @Input('span.md') spanMd?: OneTo12;
  @Input('span.sm') spanSm?: OneTo8;
  @Input('span.xs') spanXs?: OneTo4;

  _class?: string;

  ngOnChanges() {
    this._class = '';

    if (this.spanLg || this.span)
      this._class += ` cell--lg--${this.spanLg ?? this.span}`;

    if (this.spanMd || this.span)
      this._class += ` cell--md--${this.spanMd ?? this.span}`;

    if (this.spanSm || this.span)
      this._class += ` cell--sm--${this.spanSm ?? this.span}`;

    if (this.spanXs || this.span)
      this._class += ` cell--xs--${this.spanXs ?? this.span}`;
  }

}

type OneTo12 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type OneTo8 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
type OneTo4 = 1 | 2 | 3 | 4
