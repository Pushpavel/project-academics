import {AfterViewInit, Component, ElementRef, Input, } from '@angular/core';
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
export class MdcTabsBarComponent<T extends string> implements AfterViewInit {

    @Input() tabs?: Readonly<T[]> | null;

    @Input() selection!: BehaviorSubject<T>;


    onSelect(event: any) {
        if (!this.tabs) return;
        this.selection.next(this.tabs[event.detail.index]);
    }

    ngAfterViewInit() {
        const tabBar = MDCTabBar.attachTo(this.elementRef.nativeElement);
        tabBar.useAutomaticActivation = false;
        tabBar.listen('MDCTabBar:activated', this.onSelect.bind(this));
        this.selection.subscribe(value => {
            if (this.tabs && value)
                tabBar.activateTab(this.tabs.findIndex(val => val == value));
        });
    }


    constructor(private elementRef: ElementRef) {
    }
}
