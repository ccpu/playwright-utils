import { BrowserManager } from './BrowserManager';
import { getConfigs } from './configs';
import { BrowserProps } from './typings';

let _browser: BrowserManager;

export const getBrowser = async (
  browserOptions?: BrowserProps,
  newInstance = false,
) => {
  if (newInstance) {
    const newBrowser = await new BrowserManager(getConfigs()).launch(
      browserOptions,
    );
    return newBrowser;
  }
  if (!_browser) {
    _browser = await new BrowserManager(getConfigs()).launch(browserOptions);
  }
  return _browser;
};
