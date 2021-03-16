import {Injectable} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';
import {Subject} from 'rxjs';

export interface PageSettings {
  title?: string,
  templates: Map<PAGE_TEMPLATE, CdkPortal>
}


export enum PAGE_TEMPLATE {
  TOP_BAR_HEADER,
  SECONDARY_HEADER
}

@Injectable({
  providedIn: 'root'
})
export class PageService extends Subject<PageSettings> {
}
