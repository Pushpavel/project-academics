import {Component, Input} from '@angular/core';
import {CourseDetailRaw} from '@models/course.model';

@Component({
  selector: 'batch-grid',
  templateUrl: './batch-grid.component.html',
})
export class BatchGridComponent {

  @Input() courseCollections !: Map<string, CourseDetailRaw[]>

}
