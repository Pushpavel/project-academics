import {Component} from '@angular/core';

@Component({
  selector: 'inner-layout,[inner-layout]',
  template: `
    <ng-content></ng-content>
  `,
  host: {class: 'mdc-layout-grid__inner'}
})
export class InnerLayoutComponent {
}
