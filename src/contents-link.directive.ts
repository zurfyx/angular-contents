import {
  Directive,
  Host,
  HostListener,
  HostBinding,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { ContentsDirective } from './contents.directive';

@Directive({
  selector: '[contentsLink]',
  exportAs: 'contentsLink',
})
export class ContentsLinkDirective implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() href;
  @HostBinding('class.active') active = false;

  constructor(
    @Host() public contents: ContentsDirective,
  ) { }

  ngOnInit() {
    this.contents._activeSection$
      .takeUntil(this.ngUnsubscribe)
      .subscribe((sectionName: string) => {
        this.active = `#${sectionName}` === this.href;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
