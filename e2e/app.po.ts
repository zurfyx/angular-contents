import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getSectionById(sectionName: string) {
    return element(by.id(sectionName));
  }

  getTableOfContentsItemByHref(sectionHref: string) {
    return element(by.css(`.contents-table [href="${sectionHref}"]`));
  }

  getActiveTableOfContentsItemByHref(sectionHref: string) {
    return element(by.css(`.contents-table .active[href="${sectionHref}"]`));
  }

  getSwitch() {
    return element(by.css('.switch'));
  }
}
