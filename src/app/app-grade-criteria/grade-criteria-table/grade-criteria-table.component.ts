import {Component, OnInit} from '@angular/core';

interface GradeCriteria {
  s: number;
  a: number;
  b: number;
  c: number;
  d: number;
}

@Component({
  selector: 'app-grade-criteria-table',
  templateUrl: './grade-criteria-table.component.html',
  styleUrls: ['./grade-criteria-table.component.scss']
})
export class GradeCriteriaTableComponent implements OnInit {

  gradeCriteria: GradeCriteria = {
    s: 91,
    a: 81,
    b: 71,
    c: 61,
    d: 51,
  };

  maxMark = 100;
  minMark = 40;

  constructor() {
  }

  ngOnInit(): void {
  }

}
