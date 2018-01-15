import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

@Directive({
  selector: '[contents]',
  exportAs: 'contents',
})
export class ContentsDirective implements OnInit {
  @Input() scrollingView: HTMLElement;

  _onScroll$: Subject<Event> = new Subject<Event>();
  _activeSection$: BehaviorSubject<String> = new BehaviorSubject<String>(null);

  constructor() { }

  ngOnInit() {
    // Subscribe to scrollingView scroll events. Sections will detectChanges() on scroll changes.
    (this.scrollingView || document).addEventListener('scroll', (event: Event) => {
      this._onScroll$.next(event);
    });
  }

  activeSection(): Observable<String> {
    return this._activeSection$
      .asObservable()
      .filter(section => !!section); // Prevent returning null values.
  }
}
