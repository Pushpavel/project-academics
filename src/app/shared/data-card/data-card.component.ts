import {Component, Input, OnInit} from '@angular/core'

interface cardRow {
  title: string;
  content: string;
}

@Component({
  selector: 'data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent implements OnInit {

  @Input() cardTitle: string | undefined;

  @Input() cardTable: Array<cardRow> | undefined;

  // cardTitle = 'TESTING';
  //
  // cardTable = [{title: 'Chips', content: 'Good'},
  //   {title: 'Chips', content: 'Good'},
  //   {title: 'Chips', content: 'Good'}];

  constructor() {
  }

  ngOnInit(): void {
  }

}
