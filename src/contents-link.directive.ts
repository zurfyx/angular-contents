import { Directive, Host, HostListener, HostBinding, Input, OnInit } from '@angular/core';

import { ContentsDirective } from './contents.directive';

@Directive({
  selector: '[contentsLink]',
  exportAs: 'contentsLink',
})
export class ContentsLinkDirective implements OnInit {
  @Input() contentsLink: string;
  @HostBinding('href') href: string;

  constructor(
    @Host() public contents: ContentsDirective,
  ) { }

  ngOnInit() {
    this['href'] = `#${this.contentsLink}`;
  }

  @HostListener('click')
  onClick() {
    this.contents.scrollTo(this.contentsLink);
  }
}
