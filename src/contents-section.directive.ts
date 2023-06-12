import {
  Directive,
  Host,
  HostListener,
  HostBinding,
  Input,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { documentOffset, getAbsoluteHeight } from './html-utils';
import { ContentsDirective } from './contents.directive';

@Directive({
  selector: '[contentsSection]',
  exportAs: 'contentsSection',
})
export class ContentsSectionDirective implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject<void>();

  @HostBinding('id') @Input() contentsSection: string;

  constructor(
    @Host() public contents: ContentsDirective,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.detectActiveChanges();
    this.contents._onScroll$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: Event) => {
        this.detectActiveChanges();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  detectActiveChanges() {
    if (this.isInRange() || !this.contents._activeSection$.value) {
      this.contents._activeSection$.next(this.contentsSection);
    }
  }

  isInRange(): boolean {
    const pageOffset: number = this.contents.scrollingView ? this.contents.scrollingView.scrollTop : documentOffset();
    const element: HTMLElement = this.elementRef.nativeElement;
    const offset: number = element.offsetTop;
    const height: number = getAbsoluteHeight(element);

    return pageOffset >= offset && pageOffset <= offset + height;
  }
}
