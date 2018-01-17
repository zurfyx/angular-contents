import { browser } from 'protractor';

export function scrollTo(scrollToElement, scrollingView = 'window') {
  const wd = browser.driver;
  return scrollToElement.getLocation().then((loc) => (
      wd.executeScript(`${scrollingView}.scrollTo(0,arguments[0])`, loc.y + 1)
  ));
}
