import {Component, Input, OnInit} from '@angular/core';
import {CourseCollection} from '@lib/models/course.model';

@Component({
  selector: 'batch-grid',
  templateUrl: './batch-grid.component.html',
})
export class BatchGridComponent {

  @Input() courseCollections: CourseCollection[] = [];

}
