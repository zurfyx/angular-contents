import { Directive, Host, HostListener, HostBinding, Input } from '@angular/core';

import { ContentsDirective } from './contents.directive';

@Directive({
  selector: '[contentsSection]',
  exportAs: 'contentsSection',
})
export class ContentsSectionDirective {
  @HostBinding('id') @Input() contentsSection: string;

  constructor(
    @Host() public contents: ContentsDirective,
  ) {
    this.detectActiveChanges();
  }

  @HostListener('window:scroll', ['$event'])
  detectActiveChanges() {
    console.info(window.pageYOffset);
  }

  isInRange(target: HTMLElement): boolean {
    return true;
  }
}
