import { Directive } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

@Directive({
  selector: '[contents]',
  exportAs: 'contents',
})
export class ContentsDirective {
  private activeSection$: BehaviorSubject<String> = new BehaviorSubject<String>(null);

  constructor() { }

  activeSection(): Observable<String> {
    return this.activeSection$
      .asObservable()
      .filter(section => !!section); // Prevent returning null values.
  }
}
