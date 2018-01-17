import { browser, protractor } from 'protractor';

import { scrollTo } from './protractor-utils';
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

  it('should have a "Section One" with its id set', () => {
    expect(page.getSectionById('section-one').isPresent()).toBe(true);
    expect(page.getSectionById('section one').isPresent()).toBe(false);
  });

  it('should have a table of contents link to "Section One" section', () => {
    expect(page.getTableOfContentsItemByHref('#section-one').isPresent()).toBe(true);
    expect(page.getTableOfContentsItemByHref('section-one').isPresent()).toBe(false);
  });

  it('section two should be active when scrolled past that section', () => {
    const section = page.getSectionById('section-two');
    const active = page.getActiveTableOfContentsItemByHref('#section-two');

    scrollTo(section);

    browser.wait(protractor.ExpectedConditions.presenceOf(active), 5000);
    expect(active.isPresent()).toBe(true);
  });

  it('scroll view section two should be active when scrolled past that section', () => {
    const switchElement = page.getSwitch();
    const section = page.getSectionById('section-two');
    const active = page.getActiveTableOfContentsItemByHref('#section-two');

    switchElement.click(); // Switch to scroll view demo.

    scrollTo(section, 'document.querySelector(\'.framed\')');

    browser.wait(protractor.ExpectedConditions.presenceOf(active), 5000);
    expect(active.isPresent()).toBe(true);
  });
});
