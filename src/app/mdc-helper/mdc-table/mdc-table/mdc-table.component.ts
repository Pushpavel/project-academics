import {Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
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

  @Input() set rows(rows: T[] | null) {
    // TODO: clone rows
    if (rows) this.source.next(rows);
  }

  @Output() edit = new EventEmitter<EditEvent<T>>();


  source = new BehaviorSubject<T[]>([]);

  onChange(event: Event, row: T, col: ColumnDirective<T>, rows: T[], index: number) {
    const target = event.target as HTMLInputElement;

    if (target.validity.valid) {
      row[col.key as keyof T] = col._numeric ? target.valueAsNumber : target.value as any;

      this.edit.next({row, col, rows, target, index});
    }
  }

}

export interface EditEvent<T> extends CellContext<T> {
  target: HTMLInputElement,
}

export interface CellContext<T> {
  row: T,
  col: ColumnDirective<T>,
  rows: T[],
  index: number
}
