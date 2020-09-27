import { pagePropsMock, PageProps } from '../pageProps';

export const pageMock = (): Promise<PageProps> => {
  return new Promise<PageProps>((resolvePage) => {
    resolvePage(pagePropsMock());
  });
};

export const browserMock = async () =>
  new Promise((resolveFun) => {
    resolveFun({
      close: () => new Promise((resolve) => resolve({})),
      newContext: () =>
        new Promise((resolveContext) =>
          resolveContext({
            newPage: pageMock,
          }),
        ),
    });
  });

const connect = {
  connect: browserMock,
  launch: browserMock,
};

jest.createMockFromModule('playwright');

module.exports = {
  chromium: connect,
  firefox: connect,
  webkit: connect,
};
