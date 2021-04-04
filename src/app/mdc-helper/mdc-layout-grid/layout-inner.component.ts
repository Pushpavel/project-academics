import {Component} from '@angular/core';

@Component({
  selector: '[layoutInner]',
  template: `
    <ng-content></ng-content>
  `,
  host: {class: 'mdc-layout-grid__inner'}
})
export class LayoutInnerComponent {
}
