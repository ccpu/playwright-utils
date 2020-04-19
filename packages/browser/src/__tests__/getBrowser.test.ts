import { getBrowser } from '../getBrowser';

describe('getBrowser', () => {
  it('should creat global browser', async () => {
    const browser = await getBrowser();
    expect(browser).toBeDefined();
    expect((await getBrowser()) === browser).toBeTruthy();
  });

  it('should create new instance', async () => {
    const globalBrowser = await getBrowser();
    const newBrowser = await getBrowser(undefined, true);
    expect(globalBrowser === newBrowser).toBeFalsy();
  });
});
