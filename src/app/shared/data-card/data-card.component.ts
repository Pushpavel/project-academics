import {Component, Input} from '@angular/core';


@Component({
  selector: 'data-card',
  template: `
    <h6 class="mdc-card-title">{{title}}</h6>
    <ng-content></ng-content>
  `,
  host: {class: 'mdc-card mdc-card--outlined'},
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent {
  @Input() title?: string;
}
