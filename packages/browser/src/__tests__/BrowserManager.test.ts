import { BrowserManager } from '../BrowserManager';

describe('remote browser', () => {
  let browser: BrowserManager;

  beforeEach(() => {
    browser = new BrowserManager({
      browserLocation: 'remote',
      wsEndpoint: 'ws://',
    });
  });

  afterEach(async () => {
    await browser.closeAll();
  });

  it('should throw error when browserTypes not provided', async () => {
    await expect(browser.launch({ browserTypes: [] })).rejects.toThrow();
  });

  it('should have specified browsers', async () => {
    await browser.launch({ browserTypes: ['chromium', 'webkit'] });

    expect(browser.getBrowserInstances()).toHaveLength(2);
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
});

describe('local Browser', () => {
  let browser: BrowserManager;

  beforeEach(() => {
    browser = new BrowserManager({
      browserLocation: 'local',
      executablePath: {
        chromium: 'path to chromium',
        firefox: 'path to firefox',
        webkit: 'path to webkit',
      },
    });
  });

  afterEach(async () => {
    await browser.closeAll();
  });

  it('should have specified browsers', async () => {
    await browser.launch({ browserTypes: ['chromium', 'webkit', 'firefox'] });

    expect(browser.getBrowserInstances()).toHaveLength(3);
  });

  it('should return pages', async () => {
    await browser.launch({ browserTypes: ['chromium', 'webkit', 'firefox'] });
    const pages = await browser.newPages();
    expect(pages).toHaveLength(3);
  });

  it('should create browser instance when calling newPage', async () => {
    await browser.newPage('webkit');
    expect(browser.getBrowser('webkit')).toBeDefined();
  });

  it('should close all browser', async () => {
    await browser.launch({ browserTypes: ['chromium', 'webkit', 'firefox'] });
    await browser.closeAll();
    expect(browser.getBrowserInstances()).toHaveLength(0);
  });

  it('should close one browser', async () => {
    await browser.launch({ browserTypes: ['chromium', 'webkit', 'firefox'] });
    await browser.close('chromium');
    expect(browser.getBrowserInstances()).toHaveLength(2);
  });
});
