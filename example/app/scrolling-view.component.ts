import { Component, ViewEncapsulation, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-scrolling-view',
  templateUrl: 'scrolling-view.component.html',
  styleUrls: ['scrolling-view.component.scss'],
})
export class ScrollingViewComponent {
  @ViewChild('container', {static: true}) private container: ElementRef;

  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {}

  public animateScroll(sectionTarget: string): void {
    // https://github.com/Nolanus/ngx-page-scroll#service
    const pageScrollInstance: PageScrollInstance = new PageScrollInstance({
      document: this.document, scrollTarget: sectionTarget, scrollViews: [this.container.nativeElement]
    });
    this.pageScrollService.start(pageScrollInstance);
  }
}
