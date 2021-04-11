import {Component, Input} from '@angular/core';

@Component({
  selector: 'top-bar-layout',
  template: `
    <top-bar class="primary-bg" [title]="title">
      <ng-content select="[top-bar-content]"></ng-content>
    </top-bar>

    <ng-content select="[container]"></ng-content>

    <div class="default-container">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./top-bar-layout.component.scss']
})
export class TopBarLayoutComponent {
  @Input() title!: string;

  constructor() {
  }

}
