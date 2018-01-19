import { browser } from 'protractor';

export function scrollTo(scrollToElement, scrollingView = 'window'): void {
  return scrollToElement.getLocation().then((loc) => (
      browser.executeScript(`${scrollingView}.scrollTo(0,arguments[0])`, loc.y + 1)
  ));
}

export async function offsetDiff(element): Promise<number> {
  return browser.executeScript<number>('return arguments[0].getBoundingClientRect().top;', element.getWebElement());
}
