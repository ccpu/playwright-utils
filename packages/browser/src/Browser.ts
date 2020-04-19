/* eslint-disable no-await-in-loop */
import { chromium, firefox, webkit } from 'playwright-core';
import {
  Page,
  BrowserProps,
  PageCommonProps,
  BrowserTypes,
  BrowserLaunchOptions,
  PlaywrightBrowser,
} from './typings';
import { ConfigProps } from './configs';

import { launchOptionsToUrlParts } from './utils/convert-launch-options';

interface PlaywrightBrowserInstance extends PlaywrightBrowser {
  browserType: string;
}

const playwright = {
  chromium,
  firefox,
  webkit,
};

class Browser {
  private browserInstances: PlaywrightBrowserInstance[] = [];

  private configs: ConfigProps;

  browserTypes: string[] = [];

  constructor(config: ConfigProps) {
    this.configs = config;
  }

  async launch(props: BrowserProps = {}) {
    const { browserTypes = ['chromium'], browserLaunchOptions } = props;

    if (!browserTypes || !browserTypes.length) {
      throw new Error('Must provide browserTypes!');
    }

    this.browserTypes = [...new Set(browserTypes)];

    await this.registerBrowser(browserTypes, browserLaunchOptions);

    return this;
  }

  async newPage(
    browser?: PlaywrightBrowserInstance,
    pageCommonProps?: PageCommonProps,
  ) {
    const browserInstance = browser || this.browserInstances[0];
    const context = await browserInstance.newContext();
    const page = ((await context.newPage()) as unknown) as Page;
    page.browserType = browserInstance.browserType;

    if (pageCommonProps) {
      Object.keys(pageCommonProps).forEach((key) => {
        page[key] = pageCommonProps[key];
      });
    }

    return page;
  }

  async newPages(pageCommonProps?: PageCommonProps) {
    const pages: Page[] = [];

    for (let index = 0; index < this.browserInstances.length; index++) {
      const browser = this.browserInstances[index];
      // eslint-disable-next-line no-await-in-loop
      const page = await this.newPage(browser, pageCommonProps);
      pages.push(page);
    }

    return pages;
  }

  async registerBrowser(
    browserTypes: BrowserTypes[] | string[],
    launchOptions?: BrowserLaunchOptions,
  ) {
    const notRegisteredBrowsers = browserTypes.filter(
      (x) => !this.browserInstances.find((b) => b.browserType === x),
    );

    if (!notRegisteredBrowsers.length) return false;

    for (let index = 0; index < notRegisteredBrowsers.length; index++) {
      const browserType = notRegisteredBrowsers[index];
      let browser: PlaywrightBrowserInstance | undefined;

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
        browser.browserType = browserType;
        this.browserInstances.push(browser);
      }
    }

    return true;
  }

  getBrowserInstances() {
    return this.browserInstances;
  }

  async close() {
    const result: Promise<void>[] = [];
    this.browserInstances.forEach((browser) => {
      result.push(browser.close());
    });
    await Promise.all(result);
  }
}

export { Browser };
