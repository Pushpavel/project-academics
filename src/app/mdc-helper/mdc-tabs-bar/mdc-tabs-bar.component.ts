import {AfterViewInit, Component, ElementRef, Input,} from '@angular/core';
import {MDCTabBar} from '@material/tab-bar';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'mdc-tabs-bar',
  templateUrl: './mdc-tabs-bar.component.html',
  host: {
    class: 'mdc-tabs-bar primary mdc-card mdc-card--outlined',
    role: 'tablist'
  }
})
export class MdcTabsBarComponent<ID extends string> implements AfterViewInit {

  @Input() map?: ReadonlyMap<ID, string>;

  @Input() selection!: BehaviorSubject<ID>;

  onSelect(event: any) {
    if (this.map)
      this.selection.next([...this.map.keys()][event.detail.index]);
  }

  ngAfterViewInit() {
    const tabBar = MDCTabBar.attachTo(this.elementRef.nativeElement);
    tabBar.useAutomaticActivation = false;
    tabBar.listen('MDCTabBar:activated', this.onSelect.bind(this));

    this.selection.subscribe(id => {
      if (this.map)
        tabBar.activateTab([...this.map.keys()].indexOf(id));
    });
  }


  constructor(private elementRef: ElementRef) {
  }
}
