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
export class MdcTableComponent<T extends Readonly<T>> {

  @ContentChildren(ColumnDirective) columns!: QueryList<ColumnDirective<T>>;
  @Input() editableTemplate?: TemplateRef<T>;

  @Input() rows: Readonly<T[]> | null = null;
  @Output() edit = new EventEmitter<EditEvent<T>>();


  onChange(event: Event, row: T, col: ColumnDirective<T>, rows: Readonly<T[]>, index: number) {
    const target = event.target as HTMLInputElement;
    if (target.validity.valid)
      this.edit.next({row, col, rows, target, index});
  }

  trackByIndex = (i: number) => i;

}

export interface EditEvent<T extends Readonly<T>> extends CellContext<T> {
  target: HTMLInputElement,
}

export interface CellContext<T extends Readonly<T>> {
  row: T,
  col: ColumnDirective<T>,
  rows: Readonly<T[]>,
  index: number
}
