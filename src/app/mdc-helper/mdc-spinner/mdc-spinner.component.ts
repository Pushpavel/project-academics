import {AfterViewInit, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MDCCircularProgress} from '@material/circular-progress';

@Component({
  selector: 'mdc-spinner',
  templateUrl: './mdc-spinner.component.html',
  styleUrls: ['./mdc-spinner.component.scss'],
  host: {
    class: 'mdc-circular-progress',
    role: 'progressbar',
  }
})
export class MdcSpinnerComponent implements AfterViewInit, OnChanges {

  private spinner?: MDCCircularProgress;

  @Input() value?: number;

  @Input() size = 48;

  @HostBinding('style.width') get width() {
    return this.size + 'px';
  }

  @HostBinding('style.height') get height() {
    return this.size + 'px';
  }

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.spinner = MDCCircularProgress.attachTo(this.element.nativeElement);
    this.updateSpinner();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) this.updateSpinner();
  }

  updateSpinner() {
    if (!this.spinner || !(this.spinner.determinate = this.value != null)) return;
    this.spinner.progress = this.value;
  }

}
