import {Component} from '@angular/core';
import {PageService} from '@service/page.service';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="page|async as page">

      <top-bar-layout *ngIf="!page.disableTopBar else normalLayout">
        <ng-container *ngTemplateOutlet="normalLayout"></ng-container>
      </top-bar-layout>

    </ng-container>

    <ng-template #normalLayout>
      <router-outlet></router-outlet>
    </ng-template>
  `,
})
export class AppComponent {

  constructor(public page: PageService) {
  }
}
