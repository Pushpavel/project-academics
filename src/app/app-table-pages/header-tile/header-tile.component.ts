import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'header-tile',
  template: `
    <h4>{{title}}</h4>
    <ng-content></ng-content>
  `,
  styleUrls: ['./header-tile.component.scss']
})
export class HeaderTileComponent implements OnInit {

  @Input() title = 'Title';

  constructor() {
  }

  ngOnInit(): void {
  }

}
