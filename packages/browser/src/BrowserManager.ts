/* eslint-disable no-await-in-loop */
import { chromium, firefox, webkit } from 'playwright-core';
import {
  Page,
  BrowserOptions,
  BrowserTypes,
  BrowserLaunchOptions,
  PlaywrightBrowser,
} from './typings';
import { BrowserManagerConfigs } from './configs';

import { launchOptionsToUrlParts } from './utils/convert-launch-options';

export interface Browser extends PlaywrightBrowser {
  __browserType: BrowserTypes;
}

const playwright = {
  chromium,
  firefox,
  webkit,
};

class BrowserManager {
  private browserInstances: Browser[] = [];

  private configs: BrowserManagerConfigs;

  constructor(config: BrowserManagerConfigs) {
    this.configs = config;
  }

  async launch(props: BrowserOptions = {}) {
    const { browserTypes = ['chromium'], browserLaunchOptions } = props;

    if (!browserTypes || !browserTypes.length) {
      throw new Error('Must provide browserTypes!');
    }

    await this.registerBrowser(browserTypes, browserLaunchOptions);

    return this;
  }

  async newPage(browserType?: BrowserTypes) {
    let browserInstance =
      (browserType && this.getBrowser(browserType)) || this.browserInstances[0];

    if (!browserInstance && browserType) {
      await this.registerBrowser([browserType]);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      browserInstance = this.getBrowser(browserType)!;
    }

    const context = await browserInstance.newContext();
    const page = ((await context.newPage()) as unknown) as Page;
    page.__browserType = browserInstance.__browserType;
    return page;
  }

  async newPages() {
    const pages: Page[] = [];

    for (let index = 0; index < this.browserInstances.length; index++) {
      const browser = this.browserInstances[index];
      // eslint-disable-next-line no-await-in-loop
      const page = await this.newPage(browser.__browserType);
      pages.push(page);
    }

    return pages;
  }

  async registerBrowser(
    browserTypes: BrowserTypes[] | string[],
    launchOptions?: BrowserLaunchOptions,
  ) {
    const notRegisteredBrowsers = browserTypes.filter(
      (x) => !this.browserInstances.find((b) => b.__browserType === x),
    );

    if (!notRegisteredBrowsers.length) return false;

    for (let index = 0; index < notRegisteredBrowsers.length; index++) {
      const browserType = notRegisteredBrowsers[index];
      let browser: Browser | undefined;

      if (this.configs.browserLocation === 'remote') {
        if (!this.configs.wsEndpoint) continue;
        browser = await playwright[browserType].connect({
          wsEndpoint: `${
            typeof this.configs.wsEndpoint === 'string'
              ? this.configs.wsEndpoint
              : this.configs.wsEndpoint[browserType]
          }/${browserType}/${launchOptionsToUrlParts(launchOptions)}`,
        });
      } else if (this.configs.browserLocation === 'local') {
        if (!this.configs.executablePath) continue;
        browser = await playwright[browserType].launch({
          executablePath: this.configs.executablePath[browserType],
          ...launchOptions,
        });
      }

      if (browser) {
        browser.__browserType = browserType as BrowserTypes;
        this.browserInstances.push(browser);
      }
    }

    return true;
  }

  getBrowserInstances() {
    return this.browserInstances;
  }

  getBrowser(browserType: BrowserTypes) {
    return this.browserInstances.find((x) => x.__browserType === browserType);
  }

  async close(browserType: BrowserTypes) {
    const browser = this.getBrowser(browserType);
    if (!browser) return;
    await browser.close();
    this.browserInstances = this.browserInstances.filter(
      (x) => x.__browserType !== browserType,
    );
  }

  async closeAll() {
    const result: Promise<void>[] = [];
    this.browserInstances.forEach((browser) => {
      result.push(browser.close());
    });
    await Promise.all(result);
    this.browserInstances = [];
  }
}

export { BrowserManager };
