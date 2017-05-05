import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[tableOfContents]' })
export class ContentsDirective {
  targetName: string;
  isFirst: boolean;
  isLast: boolean;

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
  ) {
    this.targetName = elementRef.nativeElement.getAttribute('href');
    this.isFirst = elementRef.nativeElement.hasAttribute('first') || false;
    this.isLast = elementRef.nativeElement.hasAttribute('last') || false;
    if (!this.targetName) {
      throw new Error('Element\'s href attribute can\'t be blank (i.e. href="#section").');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const target = this.getTarget();
    if (!target) {
      return;
    }

    const pageOffset = window.pageYOffset;
    const targetOffset = target.offsetTop;
    const targetHeight = this.getAbsoluteHeight(target);
    const isInRange = pageOffset >= targetOffset
                      && pageOffset < targetOffset + targetHeight;
    const isFirstRange = this.isFirst && pageOffset <= targetOffset;
    const isLastRange = this.isLast && pageOffset >= targetOffset + targetHeight;

    return isInRange || isFirstRange || isLastRange ? this.setActive() : this.unsetActive();
  }

  getTarget(): any {
    return document.querySelector(this.targetName);
  }

  // http://stackoverflow.com/a/23749355
  getAbsoluteHeight(element): number {
    const styles = window.getComputedStyle(element);
    const margin = parseFloat(styles['marginTop']) +
                   parseFloat(styles['marginBottom']);

    return Math.ceil(element.offsetHeight + margin);
  }

  setActive(): void {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'active', true);
  }

  unsetActive(): void {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'active', false);
  }
}
