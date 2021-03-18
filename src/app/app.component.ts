import {Component} from '@angular/core';
import {PageService} from '@service/page.service';

@Component({
  selector: 'app-root',
  template: `
    <top-bar-layout>
      <router-outlet></router-outlet>
    </top-bar-layout>
  `,
})
export class AppComponent {

  constructor(public page: PageService) {
  }
}
