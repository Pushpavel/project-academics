import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {CdkPortal} from '@angular/cdk/portal';
import {PAGE_TEMPLATE} from '@service/page.service';

@Directive({
  selector: '[pageTemplate]'
})
export class PageTemplateDirective extends CdkPortal {

  @Input() pageTemplate: PAGE_TEMPLATE = PAGE_TEMPLATE.TOP_BAR_HEADER;

  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }

}
