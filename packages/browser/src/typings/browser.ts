import { Browser as PlaywrightBrowser } from 'playwright-core/types/types';

// type ArgsType<T> = T extends (...args: infer U) => unknown ? U : never;

export type BrowserLaunchOptions = {
  /**
   * Whether to run browser in headless mode. More details for Chromium and Firefox. Defaults to `true` unless the `devtools` option is `true`.
   */
  headless?: boolean;

  /**
   * Path to a browser executable to run instead of the bundled one. If `executablePath` is a relative path, then it is resolved relative to current working directory. Note that Playwright only works with the bundled Chromium, Firefox or WebKit, use at your own risk.
   */
  executablePath?: string;

  /**
   * Additional arguments to pass to the browser instance. The list of Chromium flags can be found here.
   */
  args?: Array<string>;

  /**
   * If `true`, Playwright does not pass its own configurations args and only uses the ones from `args`. If an array is given, then filters out the given default arguments. Dangerous option; use with care. Defaults to `false`.
   */
  ignoreDefaultArgs?: boolean | Array<string>;

  /**
   * Close the browser process on Ctrl-C. Defaults to `true`.
   */
  handleSIGINT?: boolean;

  /**
   * Close the browser process on SIGTERM. Defaults to `true`.
   */
  handleSIGTERM?: boolean;

  /**
   * Close the browser process on SIGHUP. Defaults to `true`.
   */
  handleSIGHUP?: boolean;

  /**
   * Maximum time in milliseconds to wait for the browser instance to start. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
   */
  timeout?: number;

  /**
   * Whether to pipe the browser process stdout and stderr into `process.stdout` and `process.stderr`. Defaults to `false`.
   */
  dumpio?: boolean;

  /**
   * Specify environment variables that will be visible to the browser. Defaults to `process.env`.
   */
  env?: Record<string, unknown>;

  /**
   * **Chromium-only** Whether to auto-open a Developer Tools panel for each tab. If this option is `true`, the `headless` option will be set `false`.
   */
  devtools?: boolean;

  /**
   * Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on.
   */
  slowMo?: number;
};

export interface CrossBrowserTest {
  runCrossBrowserTest?: boolean;
  crossBrowserTestBrowserTypes?: BrowserTypes[];
  browserLaunchOptions?: BrowserLaunchOptions;
}

export type BrowserTypes = 'chromium' | 'firefox' | 'webkit';

export interface BrowserOptions {
  browserTypes?: BrowserTypes[];
  browserLaunchOptions?: BrowserLaunchOptions;
}

export { PlaywrightBrowser };
