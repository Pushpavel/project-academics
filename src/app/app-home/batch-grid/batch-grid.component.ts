import {Component, Input} from '@angular/core';
import {Course} from '@lib/models/course.model';

@Component({
  selector: 'batch-grid',
  templateUrl: './batch-grid.component.html',
})
export class BatchGridComponent {

  @Input() courseCollections !: Map<string, Course[]>

}
