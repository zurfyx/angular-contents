import { browser, protractor } from 'protractor';

import { scrollTo, offsetDiff } from './protractor-utils';
import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display "Angular Contents"', () => {
    expect(page.getTitleText()).toContain('Angular Contents');
  });

  it('[default] should have a "Section One" with its id set', () => {
    expect(page.getSectionById('section-one').isPresent()).toBe(true);
    expect(page.getSectionById('section one').isPresent()).toBe(false);
  });

  it('[default] should have a table of contents link to "Section One" section', () => {
    expect(page.getTableOfContentsItemByHref('#section-one').isPresent()).toBe(true);
    expect(page.getTableOfContentsItemByHref('section-one').isPresent()).toBe(false);
  });

  it('[default] section two should be active when scrolled past that section', () => {
    const section = page.getSectionById('section-two');
    const active = page.getActiveTableOfContentsItemByHref('#section-two');

    scrollTo(section);

    browser.wait(protractor.ExpectedConditions.presenceOf(active), 5000);
    expect(active.isPresent()).toBe(true);
  });

  it('[scroll view] section two should be active when scrolled past that section', () => {
    const switchElement = page.getScrollViewSwitch();
    const section = page.getSectionById('section-two');
    const active = page.getActiveTableOfContentsItemByHref('#section-two');

    switchElement.click(); // Switch to scroll view demo.

    scrollTo(section, 'document.querySelector(\'.framed\')');

    browser.wait(protractor.ExpectedConditions.presenceOf(active), 5000);
    expect(active.isPresent()).toBe(true);
  });

  it('[scroll view table] section two should be active when scrolled past that section', () => {
    const switchElement = page.getScrollViewSwitch();
    const switchTableElement = page.getScrollViewTableSwitch();
    const section = page.getSectionById('section-two');
    const active = page.getActiveTableOfContentsItemByHref('#section-two');

    switchElement.click(); // Switch to scroll view demo.
    switchTableElement.click();

    scrollTo(section, 'document.querySelector(\'.framed\')');

    browser.wait(protractor.ExpectedConditions.presenceOf(active), 5000);
    expect(active.isPresent()).toBe(true);
  });

  it('[default] section one should be active by default', () => {
    const active = page.getActiveTableOfContentsItemByHref('#section-one');
    expect(active.isDisplayed()).toBe(true);
  });

  it('[default] table should be aligned with content when on top', async () => {
    const table = page.getTableOfContents();
    const section = page.getSectionById('section-one');

    const tableOffset = await offsetDiff(table);
    const sectionOffset = await offsetDiff(section);

    expect(tableOffset).toBeGreaterThan(0);
    expect(tableOffset).toBe(sectionOffset);
  });

  it('[default] table should just follow until the end of contents', async () => {
    const contents = page.getContents();
    const table = page.getTableOfContents();

    browser.executeScript('window.scrollTo(0, document.body.scrollHeight)');

    const contentsOffset: number = await offsetDiff(contents);
    expect(contentsOffset).toBeLessThan(0);
  });
});
