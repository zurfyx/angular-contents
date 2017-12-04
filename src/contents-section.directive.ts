import {
  Directive,
  Host,
  HostListener,
  HostBinding,
  Input,
  ElementRef,
} from '@angular/core';

import { ContentsDirective } from './contents.directive';

@Directive({
  selector: '[contentsSection]',
  exportAs: 'contentsSection',
})
export class ContentsSectionDirective {
  @HostBinding('id') @Input() contentsSection: string;

  constructor(
    @Host() public contents: ContentsDirective,
    private elementRef: ElementRef,
  ) {
    this.detectActiveChanges();
  }

  @HostListener('window:scroll', ['$event'])
  detectActiveChanges() {
    if (this.isInRange()) {
      this.contents._activeSection$.next(this.contentsSection);
    }
  }

  isInRange(): boolean {
    const pageOffset: number = window.pageYOffset;
    const element: HTMLElement = this.elementRef.nativeElement;
    const offset: number = element.offsetTop;
    const height: number = this.getHeight();

    return pageOffset >= offset && pageOffset <= offset + height;
  }

  // http://stackoverflow.com/a/23749355
  getHeight(): number {
    const element: HTMLElement = this.elementRef.nativeElement;
    const styles = window.getComputedStyle(element);
    const margin = parseFloat(styles.marginTop || '0') +
                   parseFloat(styles.marginBottom || '0');

    return Math.ceil(element.offsetHeight + margin);
  }
}
