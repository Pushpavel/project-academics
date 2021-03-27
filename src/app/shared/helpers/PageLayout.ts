/**
 * This class contains boilerplate code that updates PageService
 *
 * ** must be implemented by only one component under router-outlet hierarchy
 * Usage: export class HomePageComponent extends PageLayout {
 *
 * }
 */
import {PAGE_TEMPLATE, PageService} from '@service/page.service';
import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {PageTemplateDirective} from './page-template.directive';

@Component({
  template: ''
})
// tslint:disable-next-line:component-class-suffix
export abstract class PageLayout implements AfterViewInit {

  // needed to access the enum for *pageTemplate
  readonly t = PAGE_TEMPLATE;

  // override these values and their equivalent values in PageService will be set after view init
  // this sophisticated system is temporary, simple solution can be developed later
  readonly pageTitle?: string;
  readonly disableTopBar?: boolean;

  // We get the reference to all *pageTemplate directive from the parent Component here
  @ViewChildren(PageTemplateDirective) private pageTemplates?: QueryList<PageTemplateDirective>;

  constructor(public page: PageService) {
  }

  ngAfterViewInit() {
    this.page.next({
      title: this.pageTitle,
      disableTopBar: this.disableTopBar,
      templates: new Map(this.pageTemplates?.map(template => [template.pageTemplate, template])),
    });
  }
}
