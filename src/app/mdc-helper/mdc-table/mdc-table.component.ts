import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

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
  @Input() calculateRow?: (v: Readonly<T>) => Readonly<T>;
  @Output() cellDataChange = new EventEmitter<CellDataChangeEvent<T>>();

  get _dataSource() {
    return this.inputSource?.pipe(
      map(rows => this.calculateRow ? rows?.map(this.calculateRow) : rows)
    );
  }

  get _columnLabels() {
    return this.columnSettings.map(s => s.key);
  };


}

export type ColumnSetting<T extends Record<string, any> = any> = {
  key: keyof T,
  label: string,
  editable?: boolean,
  sortable?: boolean// NOT YET IMPLEMENTED
  flex?: number,
}

export type CellDataChangeEvent<T extends Record<string, any>> = { index: number, key: keyof T, changed_row: Readonly<T> };
