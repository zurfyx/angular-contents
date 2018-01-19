import {
  Directive,
  ElementRef,
  HostListener,
  HostBinding,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
} from '@angular/core';

import { documentOffset, getAbsoluteHeight } from './html-utils';

@Directive({
  selector: '[contentsTable]',
  exportAs: 'contentsTable',
})
export class ContentsTableDirective implements OnInit, OnChanges, OnDestroy {
  @Input() scrollingView: HTMLElement;
  @HostBinding('class.sticky') sticky = false;
  @HostBinding('style.margin-top') marginTop = '0px';

  private scrollFun: EventListenerOrEventListenerObject = (event: Event) => this.updateStickiness();

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.updateStickiness();
    this.unsubscribeScrollEventListener();
    this.subscribeScrollEventListener();
  }

  ngOnChanges() {
    this.unsubscribeScrollEventListener();
    this.subscribeScrollEventListener();
  }

  ngOnDestroy() {
    this.unsubscribeScrollEventListener();
  }

  // Subscribe to scrollingView scroll events. Sections will detectChanges() on scroll changes.
  subscribeScrollEventListener() {
    (this.scrollingView || document).addEventListener('scroll', this.scrollFun, false);
  }

  unsubscribeScrollEventListener() {
    (this.scrollingView || document).removeEventListener('scroll', this.scrollFun, false);
  }

  /**
   * Check whether the Table of Contents should be a sticky, to keep itself visible while the user
   * scrolls.
   */
  updateStickiness() {
    const pageOffset: number = this.scrollingView ? this.scrollingView.scrollTop : documentOffset();
    const parentElement: HTMLElement = this.elementRef.nativeElement.parentNode;
    const parentOffset: number = parentElement.offsetTop;
    const parentHeight: number = getAbsoluteHeight(parentElement);
    const element = this.elementRef.nativeElement;
    const elementInnerHeight: number = element.offsetHeight;

    // Edge case. Hasn't scrolled through the content yet.
    // Use a fixed margin-top of 0.
    if (pageOffset <= parentOffset) {
      this.marginTop = '0px';
      this.sticky = false;
      return;
    }

    // Edge case. Scrolling past the parent container.
    // Use a fixed margin-top based on the parent and element height.
    if (pageOffset + elementInnerHeight > parentOffset + parentHeight) {
      this.marginTop = `${parentHeight - elementInnerHeight}px`;
      this.sticky = false;
      return;
    }

    // Scrolling through the content.
    // Default (best browser performance): use a margin-top of 0 and position fixed while the user
    // is scrolling.
    // Fallback, when using a custom container: use a calculated margin to simulate a fixed position.
    if (!this.scrollingView) {
      this.marginTop = '0px';
      this.sticky = true;
    } else { // Fallback.
      this.marginTop = `${pageOffset - parentOffset}px`;
      this.sticky = false;
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
