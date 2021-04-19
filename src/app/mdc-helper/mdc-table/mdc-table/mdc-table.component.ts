import {Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef} from '@angular/core';
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

  @ContentChildren(ColumnDirective) columns!: QueryList<ColumnDirective<T>>;
  @Input() editableTemplate?: TemplateRef<T>;
  @Input() rows?: T[] | null;

  @Output() edit = new EventEmitter<EditEvent<T>>();

  onChange(event: Event, row: T, col: ColumnDirective<T>, rows: T[]) {
    const target = event.target as HTMLInputElement;

    if (target.validity.valid)
      this.edit.next({row, col, rows, target});
  }

}

export interface EditEvent<T> extends EditableTemplateContext<T> {
  target: HTMLInputElement,
}

export interface EditableTemplateContext<T> {
  row: T,
  col: ColumnDirective<T>,
  rows: T[]
}
