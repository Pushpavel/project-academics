import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output,} from '@angular/core';
import {MDCTabBar} from '@material/tab-bar';

@Component({
  selector: 'mdc-tabs-bar',
  templateUrl: './mdc-tabs-bar.component.html',
  host: {
    class: 'mdc-tabs-bar mdc-card mdc-card--outlined',
    role: 'tablist'
  }
})
export class MdcTabsBarComponent implements OnDestroy, AfterViewInit {

  @Input() tabs: String[] = [];

  @Output('handletabChange') handletabChange: EventEmitter<any> = new EventEmitter();

  updateIndex = (e: any) => {
    this.index = e.detail.index;
    this.handletabChange.emit(this.index);
  };

  index: number = 0;

  private _tabbar?: MDCTabBar;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this._tabbar = MDCTabBar.attachTo(this.elementRef.nativeElement);
    this._tabbar.activateTab(this.index);
    this._tabbar.listen('MDCTabBar:activated', this.updateIndex);
  }

  ngOnDestroy() {
    this._tabbar?.unlisten('MDCTabBar:activated', this.updateIndex);
  }


}
