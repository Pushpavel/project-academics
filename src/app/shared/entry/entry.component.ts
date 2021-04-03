import {Component, Input} from '@angular/core';

@Component({
  selector: 'data-card > entry',
  template: `
    <p class="body2">{{title}}</p>
    <h6>{{value}}</h6>
  `,
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {
  @Input() title?: string;
  @Input() value?: number;
}
