/**
 * This class contains boilerplate code that updates PageService
 *
 * ** must be implemented by every component routable in top level router-outlet ( Page Components )
 * Usage: export class HomePageComponent extends PageLayout {
 *
 * }
 */
import {PAGE_TEMPLATE, PageService} from '@service/page.service';
import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {PageTemplateDirective} from './page-template.directive';

@Component({
  template: ''
})
// tslint:disable-next-line:component-class-suffix
export abstract class PageLayout implements AfterViewInit {

  // needed to autocomplete values for *pageTemplate
  readonly t = PAGE_TEMPLATE;

  // override these values and it their equivalent values will be set in PageService after view init
  readonly pageTitle?: string;
  readonly disableTopBar?: boolean;

  // We get the reference to all *pageTemplate directive from the parent Component here
  @ViewChildren(PageTemplateDirective) private pageTemplates?: QueryList<PageTemplateDirective>;

  protected constructor(public page: PageService) {
  }

  ngAfterViewInit() {
    this.page.next({
      title: this.pageTitle,
      disableTopBar: this.disableTopBar,
      templates: new Map(this.pageTemplates?.map(template => [template.pageTemplate, template])),
    });
  }
}
