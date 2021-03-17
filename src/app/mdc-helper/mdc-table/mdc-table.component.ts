import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MDCDataTable} from '@material/data-table';

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
export class MdcTableComponent<T> implements AfterViewInit {

  @Input() inputSource: Observable<readonly Readonly<T>[]> = of([]);

  @Input('columns') columnSettings: ColumnSetting<T>[] = [];
  @Input() calculateRow?: (v: Readonly<T>) => Readonly<T>;
  @Output() rowDataChange?: EventEmitter<{ index: number, key: string, changed_row: Readonly<T> }>;

  get _dataSource() {
    return this.inputSource?.pipe(
      map(rows => this.calculateRow ? rows?.map(this.calculateRow) : rows)
    );
  }

  get _columnLabels() {
    return this.columnSettings.map(s => s.key);
  };


  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    // After ngOnInit, the `CdkTable` has created and inserted the table sections (thead, tbody,
    // tfoot). MDC requires the `mdc-data-table__content` class to be added to the body.
    const tbody = this.elementRef.nativeElement.querySelector('tbody');
    tbody.classList.add('mdc-data-table__content');

    MDCDataTable.attachTo(this.elementRef.nativeElement);
  }


}

export type ColumnSetting<T extends Record<string, any> = any> = {
  key: Extract<keyof T, string>,
  label: string,
  editable?: boolean,
  sortable?: boolean// NOT YET IMPLEMENTED
  flex?: number,
}
