import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

@Directive({
  selector: '[contents]',
  exportAs: 'contents',
})
export class ContentsDirective implements OnInit, OnChanges, OnDestroy {
  @Input() scrollingView: HTMLElement;


  _onScroll$: Subject<Event> = new Subject<Event>(); // tslint:disable-line:variable-name
  _activeSection$: BehaviorSubject<string> = new BehaviorSubject<string>(null); // tslint:disable-line:variable-name

  private scrollFun: EventListenerOrEventListenerObject = (event: Event) => this._onScroll$.next(event);

  constructor() { }

  ngOnInit() {
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

  activeSection(): Observable<string> {
    return this._activeSection$
      .asObservable()
      .filter(section => !!section); // Prevent returning null values.
  }
}
