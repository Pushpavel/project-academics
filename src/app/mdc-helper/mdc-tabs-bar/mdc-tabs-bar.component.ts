import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, } from '@angular/core';
import { MDCTabBar } from '@material/tab-bar'
import {MDCTab} from '@material/tab'
import {MDCTabScroller} from '@material/tab-scroller'
import {MDCTabIndicator} from '@material/tab-indicator'

@Component({
  selector: 'mdc-tabs-bar',
  templateUrl: './mdc-tabs-bar.component.html',
  styleUrls: ['./mdc-tabs-bar.component.scss'],
  host: {
    class: 'mdc-tabs-bar',
    role: 'tablist'
  }
})
export class MdcTabsBarComponent implements OnDestroy, AfterViewInit {

  @Input() tabs: String[] = ["tab1", "tab2"]

  @Output("handletabChange") handletabChange: EventEmitter<any> = new EventEmitter()

  updateIndex = (e: any) =>  {
    this.index = e.detail.index
    this.handletabChange.emit(this.index)
  }

  index: number = 0;

  private _tabbar?: MDCTabBar

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this._tabbar = MDCTabBar.attachTo(this.elementRef.nativeElement);
    this._tabbar.activateTab(this.index)
    this._tabbar.listen('MDCTabBar:activated', this.updateIndex)
  }

  ngOnDestroy() {
    this._tabbar?.unlisten('MDCTabBar:activated', this.updateIndex)
  }


}
