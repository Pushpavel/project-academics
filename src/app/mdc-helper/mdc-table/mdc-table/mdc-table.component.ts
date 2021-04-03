import {Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {ColumnDirective} from '../column.directive';

@Component({
  selector: 'mdc-table',
  templateUrl: './mdc-table.component.html',
  styleUrls: ['./mdc-table.component.scss'],
  host: {
    class: 'mdc-data-table'
  }
})
export class MdcTableComponent<T extends Record<string, any>> {

  @ContentChildren(ColumnDirective) columns!: QueryList<ColumnDirective>;

  @Input() rows?: T[] | null;

  @Input() editableCell?: TemplateRef<T>;

}
