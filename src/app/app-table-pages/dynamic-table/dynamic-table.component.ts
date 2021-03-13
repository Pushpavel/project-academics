import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent<M, T extends Readonly<M>> {

  @Input() inputSource: Observable<readonly T[]> = of([]);

  @Input('columns') columnSettings: ColumnSetting[] = [];
  @Input() calculateRow?: (v: T) => T;
  @Output() rowDataChange?: EventEmitter<{ index: number, key: string, changed_row: T }>;

  get _dataSource() {
    return this.inputSource?.pipe(
      map(rows => this.calculateRow ? rows?.map(this.calculateRow) : rows)
    );
  }

  get _columnLabels() {
    return this.columnSettings.map(s => s.key);
  };


}

export type ColumnSetting = {
  key: string,
  label: string,
  editable?: boolean,
  sortable?: boolean// NOT IMPLEMENTED
  flex?: number,
}
