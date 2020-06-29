import { pagePropsMock, PageProps } from '@playwright-utils/mocks';
import { mouseDownOnSelector } from '../mouse-down-on-selector';

const pageMock = (): Promise<PageProps> => {
  return new Promise<PageProps>((resolvePage) => {
    resolvePage(pagePropsMock());
  });
};

describe('mouseDownOnSelector', () => {
  let page: PageProps;
  beforeAll(async () => {
    page = await pageMock();
    page.mouseDownOnSelector = mouseDownOnSelector;
  });

  it('should mouse down on center', async () => {
    const moveMock = jest.fn();
    const downMock = jest.fn();
    page.mouse.move = moveMock;
    page.mouse.down = downMock;

    await page.mouseDownOnSelector('#selector');
    expect(moveMock.mock.calls[0]).toMatchObject([50, 50]);
    expect(downMock).toHaveBeenCalledTimes(1);
  });

  it('should mouse down on specified point', async () => {
    const moveMock = jest.fn();
    const downMock = jest.fn();
    page.mouse.move = moveMock;
    page.mouse.down = downMock;

    await page.mouseDownOnSelector('#selector', { x: 10, y: 20 });
    expect(moveMock.mock.calls[0]).toMatchObject([10, 20]);
    expect(downMock).toHaveBeenCalledTimes(1);
  });
});
