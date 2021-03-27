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

  @Input('columns') columnSettings: ColumnSetting<T>[] = [];
  @Output() cellDataChange = new EventEmitter<CellDataChangeEvent<T>>();

  get _columnLabels() {
    return this.columnSettings.map(s => s.key);
  };

}

export type ColumnSetting<T extends Record<string, any> = any> = {
  key: keyof T,
  label: string,
  editable?: boolean,
  sortable?: boolean // TODO: Implement this
  flex?: number,
}

export type CellDataChangeEvent<T extends Record<string, any>> = { index: number, key: keyof T, changed_row: Readonly<T> };
