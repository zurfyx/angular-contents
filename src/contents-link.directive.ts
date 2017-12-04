import { Directive, Host, HostListener, HostBinding, Input, OnInit } from '@angular/core';

import { ContentsDirective } from './contents.directive';

@Directive({
  selector: '[contentsLink]',
  exportAs: 'contentsLink',
})
export class ContentsLinkDirective implements OnInit {

  constructor(
    @Host() public contents: ContentsDirective,
  ) { }

  ngOnInit() { }
}
