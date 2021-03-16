import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <top-bar-layout>
      <router-outlet></router-outlet>
    </top-bar-layout>
  `,
})
export class AppComponent {

}
