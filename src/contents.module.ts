import { NgModule } from '@angular/core';

import { ContentsDirective } from './contents.directive';
import { ContentsSectionDirective } from './contents-section.directive';
import { ContentsLinkDirective } from './contents-link.directive';

@NgModule({
  imports: [],
  exports: [
    ContentsDirective,
    ContentsSectionDirective,
    ContentsLinkDirective,
  ],
  declarations: [
    ContentsDirective,
    ContentsSectionDirective,
    ContentsLinkDirective,
  ],
  providers: [],
})
export class ContentsModule { }
