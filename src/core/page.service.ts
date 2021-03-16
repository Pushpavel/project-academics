import {Injectable} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';
import {BehaviorSubject} from 'rxjs';

/**
 * Makes PageSettings accessible globally
 * This is useful for components that exists outside a router-outlet such as TopBarLayout
 *
 * Note:
 * This service is not meant to be used for communication b/w pages (or) components inside a page
 * Use RouterParams and other services for this use case
 */


export interface PageSettings {
  title?: string,
  disableTopBar?: boolean,
  templates: Map<PAGE_TEMPLATE, CdkPortal>
}


export enum PAGE_TEMPLATE {
  TOP_BAR_HEADER,
  SECONDARY_HEADER
}

@Injectable({
  providedIn: 'root'
})
export class PageService extends BehaviorSubject<PageSettings> {

  constructor() {
    super({
      templates: new Map(),
    });
  }
}
