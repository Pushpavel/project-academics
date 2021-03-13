import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'mat-card',
  templateUrl: './mat-card.component.html',
  styleUrls: ['./mat-card.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {class: 'mdc-card mdc-card--outlined'},
  encapsulation: ViewEncapsulation.None
})
export class MatCardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
