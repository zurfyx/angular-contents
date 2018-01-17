import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { ContentsModule } from '../../src';

import { AppComponent } from './app.component';
import { DefaultComponent } from './default.component';
import { ScrollingViewComponent } from './scrolling-view.component';

@NgModule({
  imports: [
    BrowserModule,
    NgxPageScrollModule,
    ContentsModule,
  ],
  declarations: [
    AppComponent,
    DefaultComponent,
    ScrollingViewComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
