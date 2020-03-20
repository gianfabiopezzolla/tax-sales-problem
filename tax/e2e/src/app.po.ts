import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getRouter() {
    return element(by.css('app-root a')).getText() as Promise<string>;
  }
}
