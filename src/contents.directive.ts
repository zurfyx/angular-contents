import { Directive, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

@Directive({
  selector: '[contents]',
  exportAs: 'contents',
})
export class ContentsDirective {
  _activeSection$: BehaviorSubject<String> = new BehaviorSubject<String>(null);

  constructor() { }

  activeSection(): Observable<String> {
    return this._activeSection$
      .asObservable()
      .filter(section => !!section); // Prevent returning null values.
  }
}
