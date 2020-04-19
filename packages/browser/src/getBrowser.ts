import { Browser } from './Browser';
import { getConfigs } from './configs';
import { BrowserProps } from './typings';

let _browser: Browser;

export const getBrowser = async (browserOptions?: BrowserProps, newInstance = false) => {
  if (newInstance) {
    const newBrowser = await new Browser(getConfigs()).launch(browserOptions);
    return newBrowser;
  }
  if (!_browser) {
    _browser = await new Browser(getConfigs()).launch(browserOptions);
  }
  return _browser;
};
