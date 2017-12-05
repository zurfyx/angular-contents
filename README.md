# Angular Contents

[![npm Version](https://img.shields.io/npm/v/angular-contents.svg)](https://www.npmjs.com/package/angular-contents)
[![Build Status](https://travis-ci.org/zurfyx/angular-contents.svg?branch=master)](https://travis-ci.org/zurfyx/angular-contents)

> Angular Table of Contents that follow you while you scroll down.

## Demo

[zurfyx.github.io/angular-contents](https://zurfyx.github.io/angular-contents/)

## Install

```
npm install angular-contents
```

## Getting started

[my-module.module.ts](https://github.com/zurfyx/angular-contents/blob/master/example/app/app.module.ts)

```
import { ContentsModule } from 'angular-contents';

@NgModule({
  imports: [
    ...
    ContentsModule,
    ...
  ],
```

[my-module.component.ts](https://github.com/zurfyx/angular-contents/blob/master/example/app/app.component.ts)

∅

[my-module.component.html](https://github.com/zurfyx/angular-contents/blob/master/example/app/app.component.html)

```
<div class="columnify" contents>
  <!-- Body -->
  <div>
    <div [contentsSection]="'section-one'">
      <h1>Section One</h1>
      ...
    </div>

    <div [contentsSection]="'section-two'">
      <h1>Section Two</h1>
      ...
    </div>
  <!-- Table of Contents -->
  <div class="table-column">
    <ul class="contents-table" contentsTable>
      <li><a href="#section-one" contentsLink>Section One</a></li>
      <li><a href="#section-two" contentsLink>Section Two</a></li>
    </ul>
  </div>
</div>
```

&ast; class names can be freely renamed. Just make sure to adjust the CSS classes later accordingly.

[my-module.component.css](https://github.com/zurfyx/angular-contents/blob/master/example/app/app.component.scss)

Below are the styles that the Angular Contents [demo page](zurfyx.github.io/angular-contents) uses. Only the `<-- must have` fields are required. Feel free to adjust the rest to your website style.

The snippet above displays the Angular Contents specific styles, you can find the full page styles [here](https://github.com/zurfyx/angular-contents/blob/master/example/app/app.component.scss).

```
.contents-table {
  // Do not use margin here. It will be overwritten.
  position: absolute; // <-- must have.
  padding: 2rem;
}

.contents-table.sticky {
  position: fixed; // <-- must have.
  top: 0; // <-- must have.
}

.contents-table {
  list-style: none;
  margin: 0;
}

.contents-table a {
  border-radius: 4px;
  display: block;
  padding: 0.3rem 0.6rem;
  color: #444;
  text-decoration: none;
}

.contents-table a.active {
  background-color: #000;
  color: #fff;
}

.columnify > .table-column {
  flex: 0 1 auto;
  width: 220px;
}

// Columnify https://stackoverflow.com/a/47220287
.columnify {
  display: flex;
}

.columnify > * {
  flex: 1;
}

.columnify > *:not(:first-child) {
  margin-left: 2rem;
}
```

## Scroll animation

By default, Angular Contents carries no animation. Feel free to choose a scrolling library of your choice.

The demo page uses [ngx-page-scroll](https://github.com/Nolanus/ngx-page-scroll). Attaching it to Angular Contents is as simple as it follows.

Install the library

```
npm install ngx-page-scroll
```

Import the library into your Module

```
import { ContentsModule } from 'angular-contents';
import { NgxPageScrollModule } from 'ngx-page-scroll';

  imports: [
    ...
    ContentsModule,
    NgxPageScrollModule,
    ...
  ],
```

Add functionality into your Component HTML

```
<ul class="contents-table" contentsTable>
  <li><a href="#section-one" contentsLink pageScroll>Section One</a></li>
  <li><a href="#section-two" contentsLink pageScroll>Section Two</a></li>
  <li><a href="#section-three" contentsLink pageScroll>Section Three</a></li>
  <li><a href="#section-four" contentsLink pageScroll>Section Four</a></li>
  <li><a href="#section-five" contentsLink pageScroll>Section Five</a></li>
</ul>
```

Notice `pageScroll` addition.

For further [ngx-page-scroll](https://www.npmjs.com/package/ngx-page-scroll) configuration, such as scroll speed, you should check their [own repository](https://github.com/Nolanus/ngx-page-scroll).

## License

MIT © [Gerard Rovira Sánchez](//zurfyx.com)