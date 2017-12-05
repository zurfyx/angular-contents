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
});
