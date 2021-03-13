import { Component, Input, OnInit } from '@angular/core';
import { CourseCollection } from '@lib/models/course.model';

@Component({
  selector: 'app-batch-grid',
  templateUrl: './batch-grid.component.html',
  styleUrls: ['./batch-grid.component.scss'],
  inputs:[
    'courseCollections'
  ]
})
export class BatchGridComponent implements OnInit {

  @Input() courseCollections : CourseCollection[]  = []

  constructor() { }

  ngOnInit(): void {
  }

}
