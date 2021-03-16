/**
 * Helper Class for Managing Page Components
 * Usage: export class HomePageComponent extends PageLayout {}
 */
import {PAGE_TEMPLATE, PageService} from '@service/page.service';
import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {PageTemplateDirective} from './page-template.directive';

@Component({
  template: ''
})
// tslint:disable-next-line:component-class-suffix
export abstract class PageLayout implements OnInit {

  t = PAGE_TEMPLATE;

  pageTitle?: string;


  @ViewChildren(PageTemplateDirective) pageTemplates?: QueryList<PageTemplateDirective>;

  protected constructor(public page: PageService) {
  }

  ngOnInit() {
    this.page.next({
      title: this.pageTitle,
      templates: new Map(this.pageTemplates?.map(template => [template.pageTemplate, template]))
    });
  }
}
