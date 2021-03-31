import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from 'rxjs';

/**
 * this implementation does not sync rowDataChange with inputSource
 * as we assume the rowDataChange will change inputSource using realtime listeners
 */
@Component({
  selector: 'mdc-table',
  templateUrl: './mdc-table.component.html',
  styleUrls: ['./mdc-table.component.scss'],
  host: {
    class: 'mdc-data-table'
  }
})
export class MdcTableComponent<T extends Record<string, any>> {

  @Input() inputSource: Observable<readonly Readonly<T>[]> = of([]);
  @Output() edit = new EventEmitter<EditEvent<T>>();

  @Input('columns') columnSettings: ColumnSetting<T>[] = [];

  get _columnKeys() {
    return this.columnSettings.map(s => s.key);
  };

  onCellChange({target}: Event, key: keyof T, row: T, col: ColumnSetting) {
    if (!(target instanceof HTMLInputElement) || !(target instanceof HTMLInputElement)) return;

    this.edit.next({
      key,
      row: {...row, [key]: col.numeric ? target.valueAsNumber : target.value}
    });
  }

}

export type ColumnSetting<T extends Record<string, any> = any> = {
  key: keyof T,
  label: string,
  editable?: boolean,
  sortable?: boolean // TODO: Implement this
  flex?: number,
  numeric?: boolean,
}

export type EditEvent<T extends Record<string, any>> = { key: keyof T, row: Readonly<T> };
