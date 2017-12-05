import {
  Directive,
  Host,
  HostListener,
  HostBinding,
  Input,
  ElementRef,
  OnInit,
} from '@angular/core';

import { getAbsoluteHeight } from './html-utils';
import { ContentsDirective } from './contents.directive';

@Directive({
  selector: '[contentsSection]',
  exportAs: 'contentsSection',
})
export class ContentsSectionDirective implements OnInit {
  @HostBinding('id') @Input() contentsSection: string;

  constructor(
    @Host() public contents: ContentsDirective,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.detectActiveChanges();
  }

  @HostListener('window:scroll', ['$event'])
  detectActiveChanges() {
    if (this.isInRange() || !this.contents._activeSection$.value) {
      this.contents._activeSection$.next(this.contentsSection);
    }
  }

  isInRange(): boolean {
    const pageOffset: number = window.pageYOffset;
    const element: HTMLElement = this.elementRef.nativeElement;
    const offset: number = element.offsetTop;
    const height: number = getAbsoluteHeight(element);

    return pageOffset >= offset && pageOffset <= offset + height;
  }
}
