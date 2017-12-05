import { NgModule } from '@angular/core';

import { ContentsLinkDirective } from './contents-link.directive';
import { ContentsSectionDirective } from './contents-section.directive';
import { ContentsTableDirective } from './contents-table.directive';
import { ContentsDirective } from './contents.directive';

@NgModule({
  imports: [],
  exports: [
    ContentsLinkDirective,
    ContentsSectionDirective,
    ContentsTableDirective,
    ContentsDirective,
  ],
  declarations: [
    ContentsLinkDirective,
    ContentsSectionDirective,
    ContentsTableDirective,
    ContentsDirective,
  ],
  providers: [],
})
export class ContentsModule { }
