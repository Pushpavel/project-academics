import {Component, Input, OnInit} from '@angular/core'

interface cardRow {
  title: string;
  content: string;
}

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent implements OnInit {

  // @Input() cardTitle: string | undefined;
  //
  // @Input() cardRow: cardRow | undefined;

  cardTitle = 'Testing';

  constructor() {
  }

  // cardTable: Array<cardRow> | undefined;

  cardTable = [{title:'chips', content:'Good'}, {title:'chips', content:'Good'}, {title:'chips', content:'Good'}];

  ngOnInit(): void {
  }

}
