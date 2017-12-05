import {
  Directive,
  ElementRef,
  HostListener,
  HostBinding,
  OnInit,
} from '@angular/core';

import { getAbsoluteHeight } from './html-utils';

@Directive({
  selector: '[contentsTable]',
  exportAs: 'contentsTable',
})
export class ContentsTableDirective implements OnInit {
  @HostBinding('class.sticky') sticky = false;
  @HostBinding('style.margin-top') marginTop = '0px';

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.updateStickiness();
  }

  /**
   * Check whether the Table of Contents should be a sticky, to keep itself visible while the user
   * scrolls.
   */
  @HostListener('window:scroll', ['$event'])
  updateStickiness() {
    const pageOffset: number = window.pageYOffset;
    const parentElement: HTMLElement = this.elementRef.nativeElement.parentNode;
    const parentOffset: number = parentElement.offsetTop;
    const parentHeight: number = getAbsoluteHeight(parentElement);
    const element = this.elementRef.nativeElement;
    const elementInnerHeight: number = element.offsetHeight;

    if (pageOffset + elementInnerHeight > parentOffset + parentHeight) {
      // Use a fixed margin-top instead when scrolling past the parent container.
      this.sticky = false;
      this.marginTop = `${parentHeight - elementInnerHeight}px`;
    } else {
      // Use CSS sticky when scrolling into the parent container.
      this.marginTop = '0px';
      this.sticky = pageOffset > parentOffset;
    }
  }

  getHeight(target: HTMLElement): number {
    const element: HTMLElement = this.elementRef.nativeElement;
    const styles = window.getComputedStyle(element);
    const margin = parseFloat(styles.marginTop || '0') +
                   parseFloat(styles.marginBottom || '0');

    return Math.ceil(element.offsetHeight + margin);
  }
}
