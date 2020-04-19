import { Browser } from '../Browser';

describe('remote browser', () => {
  let browser: Browser;

  beforeEach(() => {
    browser = new Browser({
      browserLocation: 'remote',
      wsEndpoint: 'ws://',
    });
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should throw error when browserTypes not provided', async () => {
    await expect(browser.launch({ browserTypes: [] })).rejects.toThrow();
  });

  it('should have specified browsers', async () => {
    await browser.launch({ browserTypes: ['chromium', 'webkit'] });

    expect(browser.getBrowserInstances()).toHaveLength(2);
    expect(browser.browserTypes).toHaveLength(2);
  });

  it('should not register browser when browser already registered', async () => {
    await browser.launch({
      browserTypes: ['chromium', 'firefox'],
    });
    browser.registerBrowser(['chromium']);
    expect(browser.getBrowserInstances()).toHaveLength(2);
  });

  it('should have register new browser', async () => {
    await browser.launch({
      browserTypes: ['chromium'],
    });
    expect(browser.getBrowserInstances()).toHaveLength(1);
    await browser.registerBrowser(['firefox', 'webkit']);
    expect(browser.getBrowserInstances()).toHaveLength(3);
  });

  it('should have page for each browser instance', async () => {
    await browser.launch({
      browserTypes: ['chromium', 'firefox'],
    });

    let pages = await browser.newPages();

    expect(pages[0].browserType).toBe('chromium');
    expect(pages[1].browserType).toBe('firefox');

    await browser.registerBrowser(['webkit']);

    pages = await browser.newPages();

    expect(pages[2].browserType).toBe('webkit');
  });

  it('should attach props to page when creating the page', async () => {
    await browser.launch({
      browserTypes: ['chromium'],
    });

    const pages = await browser.newPages({ snapshotDelay: 1000 });

    expect(pages[0].snapshotDelay).toBe(1000);
  });
});

describe('local Browser', () => {
  let browser: Browser;

  beforeEach(() => {
    browser = new Browser({
      browserLocation: 'local',
      executablePath: {
        chromium: 'path to chromium',
        firefox: 'path to firefox',
        webkit: 'path to webkit',
      },
    });
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should have specified browsers', async () => {
    await browser.launch({ browserTypes: ['chromium', 'webkit', 'firefox'] });

    expect(browser.getBrowserInstances()).toHaveLength(3);
    expect(browser.browserTypes).toHaveLength(3);
  });
});
