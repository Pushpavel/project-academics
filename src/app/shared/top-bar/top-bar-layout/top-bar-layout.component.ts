import {Component} from '@angular/core';
import {PAGE_TEMPLATE, PageService} from '@service/page.service';

@Component({
  selector: 'top-bar-layout',
  template: `
    <ng-container *ngIf="page|async as data">
      <ng-container *ngIf="!data.disableTopBar else content">
        <top-bar class="primary-bg">
          <h5 *ngIf="data.title">{{data.title}}</h5>
          <ng-container [cdkPortalOutlet]="data.templates.get(t.TOP_BAR_HEADER)"></ng-container>
        </top-bar>
        <div>
          <ng-container [cdkPortalOutlet]="data.templates.get(t.SECONDARY_HEADER)"></ng-container>
          <ng-container *ngTemplateOutlet="content"></ng-container>
        </div>
      </ng-container>
    </ng-container>

    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrls: ['./top-bar-layout.component.scss']
})
export class TopBarLayoutComponent {

  t = PAGE_TEMPLATE;

  constructor(public page: PageService) {
  }

}
